import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CustomButton, YellowLogo } from '../atoms'
import Camera from '../../assets/camera.png'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function AddNewProduct(){
   const [sizeChosen, chooseSize] = useState("")
   const [deliveryChosen, chooseDelivery] = useState("")
   const [newFoodImage, setNewFoodImage] = useState(Camera)
   const [createData, setCreateData] = useState({size: [], deliveryMethod: []})
   const history = useHistory()
   // USE EFFECT
   useEffect(() => {
      axios.get(process.env.REACT_APP_SERVER + "/v1/users", { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
      .then((res) => { res.data.data.role === "admin" ? "" : history.push("/Home") })
      .catch((err) => { console.log(err.response) })
      }, [])
   // UPLOAD IMAGE
   const uploadImage = () => {
      Swal.fire({
         icon: "info",
         title: "Upload Image",
         text: "Silahkan pilih gambar makanan dari komputer :", 
         input: 'file',
         inputAttributes: {
            'accept': 'image/*',
            'aria-label': 'Upload image'
         },
         confirmButtonText: 'Upload',
         showCancelButton: true,
         closeOnConfirm: false,
         animation: "slide-from-top"
         })
      .then((res) => {
         if(res.value === null){ 
            Swal.fire({
               icon: "question",
               title: "Kosong?", 
               text: "Gimana uploadnya nih kalau gambarnya gak ada? XD",
               })
          }
         else{
            const reader = new FileReader()
            reader.addEventListener("load", () => {
            setNewFoodImage(reader.result)
            })
            reader.readAsDataURL(res.value)
            setCreateData({...createData, image: res.value})
            // cek format gambar -  code64, httpbin
            // axios.post("http://httpbin.org/anything", data)
            // .then((res) => {console.log(res)})
         }
      })
      .catch((err) => { console.log(err) })
   }
   // ADD NEW FOOD
   const pushSizeOrNot = (e) => {
      if(createData.size.length >= 3) { 
         Swal.fire({
         icon: "error",
         title: "Kebanyakan!", 
         text: "Input size terlalu banyak ~",
         }) }
      else { createData.size.push(e.target.outerText) }
   }
   const pushDeliveryOrNot = (e) => {
      if(createData.deliveryMethod.length >= 3) { 
         Swal.fire({
         icon: "error",
         title: "Kebanyakan!", 
         text: "Input delivery terlalu banyak ~",
         }) }
      else { createData.deliveryMethod.push(e.target.outerText) }
   }
   // ADD NEW FOOD
   const createMovieSubmit = () => {
      const {
         name, 
         price, 
         description, 
         size,
         startHour,
         endHour,
         stock,
         deliveryMethod,
         category,
         image
      } = createData
      // FORM DATA
      const foodData = new FormData()
      foodData.append("name", name)
      foodData.append("price", price)
      foodData.append("description", description)
      foodData.append("size", JSON.stringify(size))
      foodData.append("startHour", startHour)
      foodData.append("endHour", endHour)
      foodData.append("stock", stock)
      foodData.append("deliveryMethod", JSON.stringify(deliveryMethod))
      foodData.append("category", category)
      foodData.append("image", image)
      console.log(createData)
      // POST DATA TO BACKEND (CREATE)
      axios.post(process.env.REACT_APP_SERVER + "/v1/product", foodData, {
         headers: { Authorization: 'Bearer ' + localStorage.getItem("token"), 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => {
         console.log(res.data)
         Swal.fire(
            "Berhasil!", 
            name + " berhasil di tambahkan ke dalam menu!", 
            "success")
         .then(() => { history.push("/Products") })
      })
      .catch((err) => { console.log(err.response) })
   }
   console.log(createData)
   // RETURN
   return(
      <div className="addNewProduct displayRow rubikFont" style={{justifyContent: "space-between", padding: "6vw"}}>
         <div className="displayColumn addProductLeft">
            <img src={newFoodImage} style={{borderRadius: "50%", margin: "auto", marginBottom: "2vw", width: "77%"}}/>
            <CustomButton bgClr="black" brRad="1vw" btnPdg="1.5vw 0" ftSize="1.5vw" ftWg="bold" mrgn="0.5vw 0" txClr="white" value="Take a picture" wd="100%"/>
            <CustomButton bgClr="#FFBA33" brRad="1vw" btnPdg="1.5vw 0" ftSize="1.5vw" ftWg="bold" mrgn="0.5vw 0" txClr="#6A4029" value="Choose from gallery" wd="100%" onClick={() => {uploadImage()}}/>
            <input className="addNewProductInputNumber" min="1" max="24" name="startHour" type="number" required placeholder="Input start hour" style={{marginTop: "3vw"}} value={createData.startHour} onChange={(e) => { setCreateData({...createData, [e.target.name]: e.target.value}) }}/>
            <input className="addNewProductInputNumber" min="1" max="24" name="endHour" type="number" required placeholder="Input end hour" value={createData.endHour} onChange={(e) => { setCreateData({...createData, [e.target.name]: e.target.value}) }}/>
            <input className="addNewProductInputNumber" name="category" type="text" required placeholder="Input menu category" style={{marginTop: "3vw"}} onChange={(e) => { setCreateData({...createData, [e.target.name]: e.target.value}) }}/>
            <input className="addNewProductInputNumber" min="1" max="100" name="stock" type="number" required placeholder="Input stock" onChange={(e) => { setCreateData({...createData, [e.target.name]: e.target.value}) }}/>
         </div>
         <div className="displayColumn addProductRight">
            <div>Name :</div>
               <input className="newProductInputForm" name="name" placeholder="Type product name" required type="text" onChange={(e) => { setCreateData({...createData, [e.target.name]: e.target.value}) }}/>
            <div>Price :</div>
               <input className="newProductInputForm" name="price" min="1000" placeholder="Type price" required type="number" onChange={(e) => { setCreateData({...createData, [e.target.name]: e.target.value}) }}/>
            <div>Description :</div>
               <input className="newProductInputForm" name="description" placeholder="Type product description" required type="textarea" onChange={(e) => { setCreateData({...createData, [e.target.name]: e.target.value}) }}/>
            <div>Input product size :</div>
            <div className="displayRow" style={{justifyContent: "space-between", margin:"1.5vw 0", width: "33%"}}>
               <div className="hoverThis" onClick={(e) => { chooseSize("R"); pushSizeOrNot(e) }} style={sizeChosen === "R" ? {opacity: "0.5"} : null }><YellowLogo value="R"/></div>
               <div className="hoverThis" onClick={(e) => { chooseSize("L"); pushSizeOrNot(e) }} style={sizeChosen === "L" ? {opacity: "0.5"} : null }><YellowLogo value="L"/></div>
               <div className="hoverThis" onClick={(e) => { chooseSize("XL"); pushSizeOrNot(e) }} style={sizeChosen === "XL" ? {opacity: "0.5"} : null}><YellowLogo value="XL"/></div>
            </div>
            <div>Input delivery methods :</div>
            <div className="displayRow" style={{justifyContent: "space-between", margin: "1.5vw 0", width: "55%"}}>
               <div onClick={(e) => { chooseDelivery("Home Delivery"); pushDeliveryOrNot(e) }} value="Home Delivery">
                  <CustomButton 
                     bgClr={deliveryChosen === "Home Delivery" ? "#FFBA33" : "#F4F4F8"} 
                     brdr={deliveryChosen === "Home Delivery" ? "none" : "0.1vw solid rgba(186, 186, 186, 0.35)"} 
                     brRad="0.5vw" 
                     btnPdg="0.5vw 1.5vw" 
                     ftSize="0.9vw" 
                     ftWg={deliveryChosen === "Home Delivery" ? "bold" : "300"}
                     txClr={deliveryChosen === "Home Delivery" ? "#6A4029" : "#9F9F9F"} 
                     value="Home Delivery"/>
               </div>
               <div onClick={(e) => { chooseDelivery("Dine In"); pushDeliveryOrNot(e) }} value="Dine In">
                  <CustomButton 
                     bgClr={deliveryChosen === "Dine In" ? "#FFBA33" : "#F4F4F8"} 
                     brdr={deliveryChosen === "Dine In" ? "none" : "0.1vw solid rgba(186, 186, 186, 0.35)"} 
                     brRad="0.5vw" 
                     btnPdg="0.5vw 1.5vw" 
                     ftSize="0.9vw" 
                     ftWg={deliveryChosen === "Dine In" ? "bold" : "300"}
                     txClr={deliveryChosen === "Dine In" ? "#6A4029" : "#9F9F9F"} 
                     value="Dine In"/>
               </div>
               <div onClick={(e) => { chooseDelivery("Take Away"); pushDeliveryOrNot(e) }} value="Take Away">
                  <CustomButton 
                     bgClr={deliveryChosen === "Take Away" ? "#FFBA33" : "#F4F4F8"} 
                     brdr={deliveryChosen === "Take Away" ? "none" : "0.1vw solid rgba(186, 186, 186, 0.35)"} 
                     brRad="0.5vw" 
                     btnPdg="0.5vw 1.5vw" 
                     ftSize="0.9vw" 
                     ftWg={deliveryChosen === "Take Away" ? "bold" : "300"}
                     txClr={deliveryChosen === "Take Away" ? "#6A4029" : "#9F9F9F"} 
                     value="Take Away"/>
               </div>
            </div>
            <CustomButton bgClr="#6A4029" brRad="1vw" btnPdg="1.5vw 0" ftSize="1.5vw" ftWg="bold" mrgn="5vw 0 0 0" txClr="white" type="submit" value="Save product" wd="100%" onClick={() => { createMovieSubmit() }}/>
         </div>
      </div>
   )
}
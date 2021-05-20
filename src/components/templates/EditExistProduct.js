import { useEffect, useState} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import TrashBin from '../../assets/delete2.png'
import { CustomButton, YellowLogo } from '../atoms'
import Swal from 'sweetalert2'
import swal from 'sweetalert'

export default function EditExistProduct() {
   // EDIT PRODUCT SETUP
   const foodId = useParams().id
   const history = useHistory()
   const [editFoodData, setEditFood] = useState({})
   const [editFoodImg, setEditImg] = useState("https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif")
   // USE EFFECT
   useEffect(() => {
      axios.get(process.env.REACT_APP_SERVER + "/v1/users", { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
      .then((res) => { return res.data.data.role === "admin" ? null : history.push("/Home") })
      .catch((err) => { console.log(err.response) })
      axios.get(process.env.REACT_APP_SERVER + "/v1/product/" + foodId)
            .then((res) => { 
               setEditFood(res.data.data)
               setEditImg(res.data.data.image)
            })
            .catch((err) => { swal("Not found!", "Produk tidak ditemukan!", "error").then(() => {history.push("/Products")}) })
   }, [])
   // ADD-ON FUNCTION
   const changeEditValue = (e) => { setEditFood({ ...editFoodData, [e.target.name]: e.target.value }) }
   const changeEditArray = (e) => { setEditFood({ ...editFoodData, [e.target.name]: [e.target.value] }) }
   const uploadEditImage = () => {
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
            setEditImg(reader.result)
            })
            reader.readAsDataURL(res.value)
            setEditFood({...editFoodData, image: res.value})
            // cek format gambar -  code64, httpbin
            // axios.post("http://httpbin.org/anything", data)
            // .then((res) => {console.log(res)})
         }
      })
      .catch((err) => { console.log(err) })
   }
   // EDIT PRODUCT FUNCTION
   const updateOldMenu = () => {
      if(editFoodImg === "https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif") {
         Swal.fire(
            "Gambar makanan?", 
            "Gimana orang mau tertarik beli nih kalau gambarnya aja gak ada?", 
            "error")
      }
      else{
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
         } = editFoodData
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
         // POST DATA TO BACKEND (CREATE)
         axios.put(process.env.REACT_APP_SERVER + "/v1/product/" + foodId, foodData, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem("token"), 'Content-Type': 'multipart/form-data' }
         })
         .then((res) => {
            Swal.fire(
               "Berhasil!", 
               "Berhasil update menu " + name + "!", 
               "success")
            .then(() => { history.push("/ProductDetails/" + foodId) })
         })
         .catch((err) => { console.log(err.response) })
      }
   }
   // RETURN RESULT
   return(
      <div className="showInAnimation editProductPageTemplate">
         <div className="editProductLeft">
            <div className="editFoodImage">
               <img className="hoverThis editProductImageDisplayAndEdit" onClick={() => { uploadEditImage() }} src={editFoodImg === "" ? "https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg" : editFoodImg}/>
               <div className="hoverThis editDelImgBtn" onClick={() => {setEditImg("")}}><YellowLogo cls="editProductDeleteImageButton" img={TrashBin}/></div>
            </div>
         </div>
         <div className="displayColumn editProductRight poppinsFont">
            <input className="editProductInput editProductInputName" onChange={(e) => { changeEditValue(e) }} name="name" placeholder="Menu name" style={{borderBottom: "0.1vw solid #9F9F9F", fontWeight: "900", width: "100%"}} type="text" value={editFoodData.name}/>
            <div className="editProductInputPrice">IDR <input className="editProductInput" onChange={(e) => { changeEditValue(e) }} name="price" placeholder="Menu price" type="number" value={editFoodData.price}/></div>
            <textarea className="editProductInput editProductInputDescription" onChange={(e) => { changeEditValue(e) }} name="description" placeholder="Menu description" type="textarea" value={editFoodData.description}/>
            <div className="editProductDeliveryInputAreaZone" style={{justifyContent: "space-between"}}>
               <input className="editProductSizeDeliveryInput" onChange={(e) => { changeEditArray(e) }} name="size" placeholder="Menu sizes" value={editFoodData.size}/>
               <input className="editProductSizeDeliveryInput" onChange={(e) => { changeEditArray(e) }} name="deliveryMethod" placeholder="Menu delivery methods" value={editFoodData.deliveryMethod}/>
            </div>
            <div className="displayRow" style={{alignItems: "center", justifyContent: "space-between", margin: "1.5vw 0"}}>
               <div className="displayRow editProductSizeDeliveryInput" style={{alignItems: "center", justifyContent: "space-between", padding: "0", width: "25%"}}>
                  <div 
                     className="hoverThis plusMinusEditProduct" 
                     onClick={editFoodData.stock <= 0 ? null : () => { setEditFood({...editFoodData, stock: editFoodData.stock - 1}) }} 
                     style={{borderRadius: "1vw 0 0 1vw"}}>
                  -
                  </div>
                  <div>{editFoodData.stock}</div>
                  <div 
                     className="plusMinusEditProduct" 
                     onClick={ () => { setEditFood({...editFoodData, stock: editFoodData.stock + 1}) }} 
                     style={{borderRadius: "0 1vw 1vw 0"}}>
                  +
                  </div>
               </div>
               <div className="hideThisInDesktop"><CustomButton bgClr="#FFBA33" brRad="2.5vw" btnPdg="2.5vw" ftSize="4vw" ftWg="bold" onClick={() => { updateOldMenu() }} txClr="#6A4029" value="Save change" wd="50vw"/></div>
               <div className="hideThisInMobile"><CustomButton bgClr="#FFBA33" brRad="1vw" btnPdg="1vw" ftSize="1vw" ftWg="bold" onClick={() => { updateOldMenu() }} txClr="#6A4029" value="Save change" wd="11vw"/></div>
            </div>
         </div>
      </div>
   )
}
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { CustomButton, YellowLogo } from '../atoms/'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import swal from 'sweetalert'

export default function ProductDetails() {
   const transaksi = localStorage.getItem("_IdTransaction")
   const { products } = useSelector(state => state.chart)
   const dispatch = useDispatch()
   // basic set-up
   const paramsId = useParams().id
   const [getProductDetail, setProductDetailData] = useState({
      name: "Loading Food",
      image: "https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif",
      description: "Still loading",
      startTime: 0,
      endTime: 0,
      price: 0,
      size: ["L", "L", "L"],
      deliveryMethod: ["Loading", "Loading", "Loading"]
   })
   const [sizeChosen, chooseSize] = useState("")
   const [deliveryChosen, chooseDelivery] = useState("Home Delivery")
   const [howMuchProduct, plusMinusProductNumber] = useState(0)
   const [userData, setUserData] = useState("")
   const history = useHistory()
   // function
   const deleteThisMenu = () => {
      axios.delete(process.env.REACT_APP_SERVER + "/v1/product/" + paramsId, {
         headers: { Authorization: 'Bearer ' + localStorage.getItem("token"), 'Content-Type': 'multipart/form-data' }
      })
         .then((res) => { swal("Success", "Berhasil hapus makanan dari list!", "success").then(() => { history.push("/Products?page=1&limit=8") }) })
         .catch((err) => { console.log(err.response) })
   }
   // const createTransaction = () => {
   //    const sumPrice = price * howMuchProduct
   //    const transactionData = {
   //       subTotal: sumPrice,
   //       sizeProduct: sizeChosen,
   //       deliveryMethod: deliveryChosen,
   //       tax: 0,
   //       postageCost: 0
   //    }
   //    if(howMuchProduct === 0) { swal("Failed", "Untuk pemesanan menu minimal satu ~", "error") }
   //    else if(sizeChosen === "") { swal("Failed", "Tolong pilih ukurannya dulu yah ~", "error") }
   //    else if(deliveryChosen === "") { swal("Failed", "Aku harus anter atau gak nih? Tentuin dulu dong ~", "error") }
   //    else{
   //       axios.post(process.env.REACT_APP_SERVER + "/v1/trx", transactionData, { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
   //       .then((res) => { 
   //          localStorage.setItem("transactionId", res.data.data.id)
   //          localStorage.setItem("productId", getProductDetail.id)
   //          localStorage.setItem("sizeProduct", sizeChosen)
   //          localStorage.setItem("howMuch", howMuchProduct)
   //          swal("Success", "Berhasil membuat transaksi baru, silahkan lanjut ke pembayaran!", "success").then(() => {history.push("/user/Payment")}) 
   //       })
   //       .catch((err) => { console.log(err.response) })
   //    }
   // }
   // use effect
   const addToCart = () => {
      const sumPrice = price * howMuchProduct
      const product = {
         id_product: paramsId,
         name: getProductDetail.name,
         subTotal: sumPrice,
         sizeProduct: sizeChosen,
         deliveryMethod: deliveryChosen,
         tax: 0,
         postageCost: 0,
         howMuchProduct: howMuchProduct,
         image: image
      }
      if (sizeChosen === "" || deliveryChosen === "") {
         swal("Oops", "masukkan delivery metode penyajian atau ukuran makanan dengan benar", "error")
      } else if (howMuchProduct === 0) {
         swal("Oops", "jumlah pesanan belum di anda tentukan", "error")
      } else {
         if (transaksi === null) {
            if (products.length !== 0) {
               const totalPrice = products.map(item => { return item.subTotal }).reduce((a, b) => a + b, 0) + sumPrice
               products.push(product)
               dispatch({ type: "SET_TO_CHART_PRODUCT", payload: products, total: totalPrice })
               localStorage.setItem("_products", JSON.stringify(products))
               localStorage.setItem("_total", totalPrice)
            } else {
               products.push(product)
               dispatch({ type: "SET_TO_CHART_PRODUCT", payload: products, total: sumPrice })
               localStorage.setItem("_products", JSON.stringify(products))
               localStorage.setItem("_total", sumPrice)
            }
         } else {
            swal({
               text: "pesanan anda belum dibayar, Silahkan lakukan pembayaran dulu yaa",
               icon:"warning",
               buttons: ["nanti", "sekarang"]
            })
               .then(bayar => {
                  if (bayar) {
                     history.push("/user/payment")
                  }
               })
         }
      }
   }
   useEffect(() => {
      if (localStorage.getItem("token") === null) { swal("Belum login?", "Login dulu, yuk?", "warning").then(() => { history.push("/user/Login") }) }
      else {
         axios.get(process.env.REACT_APP_SERVER + "/v1/product/" + paramsId)
            .then((res) => { setProductDetailData(res.data.data) })
            .catch((err) => { swal("Not found!", "Produk tidak ditemukan!", "error").then(() => { history.push("/Products") }) })
         axios.get(process.env.REACT_APP_SERVER + "/v1/users", { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then((res) => { setUserData(res.data.data) })
            .catch((err) => { console.log(err.response) })
      }
   }, [])
   // destructuring
   const { name, price, description, size, startHour, endHour, stock, deliveryMethod, image } = getProductDetail
   return (
      <div className="showInAnimation productDetails">
         <Helmet>
            <title>{"In Cafe - " + name}</title>
         </Helmet>
         <div style={{ fontSize: "1.1vw" }}>Favorite &amp; Promo<span style={{ color: "#6A4029", fontWeight: "bold" }}>{" > " + name}</span></div>
         <div className="displayRow">
            <div className="displayColumn leftProductDetails rubikFont">
               <img src={image} style={{ borderRadius: "50%", width: "100%" }} />
               <div style={{ margin: "3vw 0", textAlign: "center" }}>
                  <div style={{ fontSize: "3.7vw", fontWeight: "bold" }}>{name}</div>
                  <div style={{ fontSize: "2vw" }}>IDR {price * howMuchProduct}</div>
               </div>
               <CustomButton bgClr="#6A4029" brRad="1vw" btnPdg="1vw 3vw" ftSize="1.1vw" ftWg="bold" mrgn="0.77vw 0" txClr="white" value="Add to Cart" wd="100%" onClick={addToCart} ></CustomButton>
               {userData.role === "admin"
                  ?
                  <CustomButton bgClr="#FFBA33" brRad="1vw" btnPdg="1vw 3vw" ftSize="1.1vw" ftWg="bold" mrgn="0.77vw 0" txClr="#6A4029" value="Edit Product" wd="100%" onClick={() => { history.push("/admin/EditProduct/" + paramsId) }}></CustomButton>
                  :
                  <CustomButton bgClr="#FFBA33" brRad="1vw" btnPdg="1vw 3vw" ftSize="1.1vw" ftWg="bold" mrgn="0.77vw 0" txClr="#6A4029" value="Ask a Staff" wd="100%"></CustomButton>
               }
               {userData.role === "admin" ?
                  <CustomButton
                     bgClr="black"
                     brRad="1vw"
                     btnPdg="1vw 3vw"
                     ftSize="1.1vw"
                     ftWg="bold"
                     mrgn="0.77vw 0"
                     txClr="white"
                     value="Delete Menu"
                     wd="100%"
                     onClick={() => deleteThisMenu()}></CustomButton>
                  :
                  null
               }
            </div>
            <div className="displayColumn rightProductDetails">
               <div className="chooseSizeZone poppinsFont">
                  Delivery only on <b>Monday to Friday</b>
                  <br />
                  at <b>{startHour} - {endHour} pm</b>
                  <div style={{ margin: "3vw 0" }}>
                     {description}
                  </div>
                  <div style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>
                     Choose a size
                     <div className="displayRow chooseSizeBtnZone">
                        {getProductDetail.size.map((item) => {
                           return <div className="hoverThis" onClick={() => { chooseSize(item) }} style={sizeChosen === item ? { opacity: "0.5" } : null}><YellowLogo value={item} /></div>
                        })}
                     </div>
                  </div>
               </div>
               <div className="chooseDeliveryMethods" style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "1.2vw", fontWeight: "bold" }}>Choose Delivery Methods</span>
                  <div className="displayRow chooseDeliveryBtnArea" style={{ marginTop: "1vw" }}>
                     {getProductDetail.deliveryMethod.map((item) => {
                        return <div>
                           <CustomButton
                              bgClr={item === "Home Delivery" ? "#6A4029" : "#F4F4F8"}
                              brdr={deliveryChosen === item ? "none" : "0.1vw solid rgba(186, 186, 186, 0.35)"}
                              brRad="0.5vw"
                              btnPdg="0.5vw 1.5vw"
                              ftSize="0.9vw"
                              ftWg={deliveryChosen === item ? "bold" : "300"}
                              mrgn="0.77vw 0"
                              txClr={deliveryChosen === item ? "white" : "#9F9F9F"}
                              value={item}
                              disabled={item !== "Home Delivery" ? true : false}
                           />
                        </div>
                     })}

                  </div>
                  <div><p className="text-right m-0 mb-3">coming soon</p></div>
                  <div className="displayRow poppinsFont" style={{ fontSize: "1.1vw", justifyContent: "space-between" }}>
                     Set time :
                     <input className="orderSetTimeInput" placeholder="Enter the time you'll arrived" />
                  </div>
               </div>
            </div>
         </div>
         <div className="checkoutZone displayRow">
            <div className="displayRow insideCheckOutZone">
               <div className="displayRow" style={{ alignItems: "center" }}>
                  <img src={image} style={{ borderRadius: "50%", height: "5vw", width: "5vw" }} />
                  <div className="displayColumn poppinsFont" style={{ fontSize: "1vw", margin: "0 3vw" }}>
                     <p style={{ fontSize: "1.5vw", fontWeight: "bold" }}>{name}</p>
                     <div>{"x" + howMuchProduct + (sizeChosen === "" ? "" : " (" + sizeChosen + ")")}</div>
                  </div>
               </div>
               <div className="displayRow" style={{ alignItems: "center", justifyContent: "space-between", width: "20%" }}>
                  <div className="displayColumn hoverThis plusMinusBtn" onClick={() => { return howMuchProduct <= 0 ? null : plusMinusProductNumber(howMuchProduct - 1) }}>-</div>
                  <div style={{ fontSize: "1.5vw", fontWeight: "1000" }}>{howMuchProduct}</div>
                  <div className="displayColumn hoverThis plusMinusBtn" onClick={() => { plusMinusProductNumber(howMuchProduct + 1) }}>+</div>
               </div>
            </div>
            <div style={{ borderRadius: "1.1vw", boxShadow: "0 0.3vw 0.5vw #DEDEDE" }}>
               <CustomButton className="checkoutBtn" bgClr="#FFBA33" brRad="1.1vw" btnPdg="3vw" ftSize="1.5vw" ftWg="bold" txClr="#6A4029" value={transaksi === null ? "CHECKOUT" : "BAYAR"} onClick={() => {
                  const sumPrice = price * howMuchProduct
                  const product = {
                     id_product: paramsId,
                     name: getProductDetail.name,
                     subTotal: sumPrice,
                     sizeProduct: sizeChosen,
                     deliveryMethod: deliveryChosen,
                     tax: 0,
                     postageCost: 0,
                     howMuchProduct: howMuchProduct,
                     image: image
                  }
                  if (sizeChosen === "" || deliveryChosen === "") {
                     swal("Oops", "masukkan delivery metode penyajian atau ukuran makanan dengan benar", "error")
                  } else if (howMuchProduct === 0) {
                     swal("Oops", "jumlah pesanan belum di anda tentukan", "error")
                  } else {
                     if (transaksi === null) {
                        if (products.length !== 0) {
                           const totalPrice = products.map(item => { return item.subTotal }).reduce((a, b) => a + b, 0) + sumPrice
                           products.push(product)
                           dispatch({ type: "SET_TO_CHART_PRODUCT", payload: products, total: totalPrice })
                           localStorage.setItem("_products", JSON.stringify(products))
                           localStorage.setItem("_total", totalPrice)
                           history.push("/cart")
                        } else {
                           products.push(product)
                           dispatch({ type: "SET_TO_CHART_PRODUCT", payload: products, total: sumPrice })
                           localStorage.setItem("_products", JSON.stringify(products))
                           localStorage.setItem("_total", sumPrice)
                           history.push("/cart")
                        }
                     }else{
                        history.push("/user/payment")
                     }
                  }
               }} />
            </div>
         </div>
      </div>
   )
}
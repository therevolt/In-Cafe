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

   // NEW CREATE TRANSACTION
   const newCreateTransaction = () => {
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
   }

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
         <div className="productDetailRoutingText">Favorite &amp; Promo<span style={{color: "#6A4029", fontWeight: "bold"}}>{" > " + name}</span></div>
         <div className="productDetailPage">
            <div className="displayColumn leftProductDetails rubikFont">
               <img className="productDetailProductImage" src={image} style={{borderRadius: "50%"}}/>
               <div className="productDetailProductDataInfoAreaZone" style={{textAlign: "center"}}>
                  <div className="productDetailProductName" style={{fontWeight: "bold"}}>{name}</div>
                  <div className="productDetailProductPrice">IDR {price * howMuchProduct}</div>
               </div>
               <div className="hideThisInDesktop"><CustomButton bgClr="#6A4029" brRad="2.5vw" btnPdg="2.5vw" ftSize="5.5vw" mrgn="0.77vw 0" onClick={addToCart} txClr="white" value="Add to Cart" wd="100%"/></div>
               <div className="hideThisInMobile"><CustomButton bgClr="#6A4029" brRad="1vw" btnPdg="1vw 3vw" ftSize="1.1vw" ftWg="bold" mrgn="0.77vw 0" onClick={addToCart} txClr="white" value="Add to Cart" wd="100%"/></div>
               {userData.role === "admin" 
               ?
               <div>
                  <div className="hideThisInDesktop">
                     <CustomButton 
                        bgClr="#FFBA33" 
                        brRad="2.5vw" 
                        btnPdg="2.5vw" 
                        ftSize="5.5vw" 
                        mrgn="1.5vw 0" 
                        txClr="#6A4029" 
                        value="Edit Product" 
                        wd="100%" 
                        onClick={() => { history.push("/admin/EditProduct/" + paramsId) }}/>
                  </div>
                  <div className="hideThisInMobile">
                     <CustomButton 
                        bgClr="#FFBA33" 
                        brRad="1vw" 
                        btnPdg="1vw 3vw" 
                        ftSize="1.1vw" 
                        ftWg="bold" 
                        mrgn="0.77vw 0" 
                        txClr="#6A4029" 
                        value="Edit Product" 
                        wd="100%" 
                        onClick={() => { history.push("/admin/EditProduct/" + paramsId) }}/>
                  </div>
               </div>
               :
               <div>
                  <div className="hideThisInDesktop">
                     <CustomButton 
                        bgClr="#FFBA33" 
                        brRad="2.5vw" 
                        btnPdg="2.5vw" 
                        ftSize="5.5vw" 
                        mrgn="1.5vw 0" 
                        txClr="#6A4029" 
                        value="Ask a Staff" 
                        wd="100%"
                        />
                  </div>
                  <div className="hideThisInMobile">
                     <CustomButton 
                        bgClr="#FFBA33" 
                        brRad="1vw" 
                        btnPdg="1vw 3vw" 
                        ftSize="1.1vw" 
                        ftWg="bold" 
                        mrgn="0.77vw 0" 
                        txClr="#6A4029" 
                        value="Ask a Staff" 
                        wd="100%"
                        />
                  </div>
               </div>
               }
               {userData.role === "admin" ? 
               <div>
                  <div className="hideThisInDesktop">
                     <CustomButton 
                        bgClr="black" 
                        brRad="2.5vw" 
                        btnPdg="2.5vw" 
                        ftSize="5.5vw"
                        mrgn="1.5vw 0" 
                        txClr="white" 
                        value="Delete Menu" 
                        wd="100%" 
                        onClick={ () => deleteThisMenu() }
                     />
                  </div>
                  <div className="hideThisInMobile">
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
                        onClick={ () => deleteThisMenu() }
                     />
                  </div>
               </div>
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
                  <div className="productDetailChooseSizeText" style={{color: "black", fontWeight: "bold", textAlign: "center"}}>
                     Choose a size
                     <div className="displayRow chooseSizeBtnZone">
                        {getProductDetail.size.map((item) => {
                           return <div className="hoverThis" onClick={() => { chooseSize(item) }} style={sizeChosen === item ? { opacity: "0.5" } : null}><YellowLogo value={item} /></div>
                        })}
                     </div>
                  </div>
               </div>
               <div className="chooseDeliveryMethods" style={{textAlign: "center"}}>
                  <div className="productDetailChooseDeliveryMethodsText" style={{fontWeight: "bold"}}>Choose Delivery Methods</div>
                  <div className="displayRow chooseDeliveryBtnArea">
                     {getProductDetail.deliveryMethod.map((item) => {
                        return <div onClick={() => { chooseDelivery(item) }}>
                           <div className="hideThisInDesktop">
                              <CustomButton 
                                 bgClr={deliveryChosen === item ? "#6A4029" : "#F4F4F8"} 
                                 brdr={deliveryChosen === item ? "none" : "0.1vw solid rgba(186, 186, 186, 0.35)"} 
                                 brRad="0.5vw" 
                                 btnPdg="0.5vw 1.5vw" 
                                 ftSize="2.5vw" 
                                 ftWg={deliveryChosen === item ? "bold" : "300"} 
                                 mrgn="0.77vw" 
                                 txClr={deliveryChosen === item ? "white" : "#9F9F9F"} 
                                 value={item}
                              />
                           </div>
                           <div className="hideThisInMobile">
                              <CustomButton 
                                 bgClr={deliveryChosen === item ? "#6A4029" : "#F4F4F8"} 
                                 brdr={deliveryChosen === item ? "none" : "0.1vw solid rgba(186, 186, 186, 0.35)"} 
                                 brRad="0.5vw" 
                                 btnPdg="0.5vw 1.5vw" 
                                 ftSize="0.9vw" 
                                 ftWg={deliveryChosen === item ? "bold" : "300"} 
                                 mrgn="0.77vw" 
                                 txClr={deliveryChosen === item ? "white" : "#9F9F9F"} 
                                 value={item}
                              />
                           </div>
                        </div>
                     })}

                  </div>
                  <div className="displayRow poppinsFont setTimeArea" style={{justifyContent: "space-between"}}>
                     Set time :
                     <input className="orderSetTimeInput" placeholder="Enter the time you'll arrived" style={{margin: "auto"}}/>
                  </div>
               </div>
            </div>
         </div>
         <div className="hideThisInDesktop" style={{width: "100%"}}>
            <div className="checkoutZone displayRow">
               <div className="displayColumn insideCheckOutZone">
                  <div className="displayRow" style={{alignItems: "center"}}>
                     <img src={image} style={{borderRadius: "50%", height: "15vw", width: "15vw"}}/>
                     <div className="displayColumn poppinsFont" style={{fontSize: "1vw", margin: "0 3vw"}}>
                        <p style={{fontSize: "3vw", fontWeight: "bold", marginBottom: "1vw"}}>{name}</p>
                        <div className="displayRow" style={{alignItems: "center", justifyContent: "space-between", marginTop: "2.5vw", width: "100%"}}>
                           <div className="displayColumn hoverThis plusMinusBtn" onClick={() => { return howMuchProduct <= 0 ? null : plusMinusProductNumber(howMuchProduct - 1) }}>-</div>
                           <div style={{fontSize: "3.5vw", fontWeight: "1000"}}>{howMuchProduct}</div>
                           <div className="displayColumn hoverThis plusMinusBtn" onClick={() => { plusMinusProductNumber(howMuchProduct + 1) }}>+</div>
                        </div>
                     </div>
                  </div>
               </div>
               <div style={{borderRadius: "1.1vw", boxShadow: "0 0.3vw 0.5vw #DEDEDE"}}>
                     <CustomButton 
                        className="checkoutBtn" 
                        bgClr="#FFBA33" 
                        brRad="1.1vw" 
                        btnPdg="3vw" 
                        ftSize="2.5vw"
                        ftWg="bold" 
                        txClr="#6A4029" 
                        value="CHECKOUT" 
                        onClick={ () => { newCreateTransaction() } }
                     />
               </div>
            </div>
         </div>
         <div className="hideThisInMobile" style={{width: "100%"}}>
            <div className="checkoutZone displayRow">
               <div className="displayRow insideCheckOutZone">
                  <div className="displayRow" style={{alignItems: "center"}}>
                     <img src={image} style={{borderRadius: "50%", height: "5vw", width: "5vw"}}/>
                     <div className="displayColumn poppinsFont" style={{fontSize: "1vw", margin: "0 3vw"}}>
                        <p style={{fontSize: "1.5vw", fontWeight: "bold"}}>{name}</p>
                        <div>{"x" + howMuchProduct + (sizeChosen === "" ? "" : " (" + sizeChosen + ")")}</div>
                     </div>
                  </div>
                  <div className="displayRow" style={{alignItems: "center", justifyContent: "space-between", width: "20%"}}>
                     <div className="displayColumn hoverThis plusMinusBtn" onClick={() => { return howMuchProduct <= 0 ? null : plusMinusProductNumber(howMuchProduct - 1) }}>-</div>
                     <div style={{fontSize: "1.5vw", fontWeight: "1000"}}>{howMuchProduct}</div>
                     <div className="displayColumn hoverThis plusMinusBtn" onClick={() => { plusMinusProductNumber(howMuchProduct + 1) }}>+</div>
                  </div>
               </div>
               <div style={{borderRadius: "1.1vw", boxShadow: "0 0.3vw 0.5vw #DEDEDE"}}>
                  <CustomButton className="checkoutBtn" bgClr="#FFBA33" brRad="1.1vw" btnPdg="3vw" ftSize="1.5vw" ftWg="bold" txClr="#6A4029" value={transaksi === null ? "CHECKOUT" : "BAYAR"} onClick={ () => { newCreateTransaction() } } />
               </div>
            </div>
         </div>
      </div>
   )
}
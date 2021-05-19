import './style.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { CustomButton } from '../../components/atoms'
import Navbar from '../../components/organisme/Navbar'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Footer } from '../../components/templates'
import Swal from 'sweetalert2'

export default function Products(){
   // take pagination query data first
   function useQuery() { return new URLSearchParams(useLocation().search) }
   const query = useQuery()
   let howManyPaginationButton = []

   // use state conf
   const [userProfileRole, setProfileData] = useState("")
   const [productCategory,setProductCategory] = useState("Favourite")
   const [getProductDetail, setProductDetailData] = useState([])
   const [queryPage, setQueryPage] = useState(query.get('page'))
   const [queryLimit, setQueryLimit] = useState(query.get('limit'))
   const history = useHistory()

   // use effect starter
   useEffect(() => {
      // GET ALL PRODUCT STARTER
      if(queryPage === null || queryLimit === null || queryPage === "" || queryLimit === "") { 
         Swal.fire("Error!", "Query paginasi (page/limit) ada yang kosong!", "error").then(() => { window.location = "/Products?page=1&limit=8" }) 
      }
      else {
         axios.get(process.env.REACT_APP_SERVER + "/v1/product")
         .then((res) => { 
            setProductDetailData(res.data.data)
            // SET HOW MANY PAGINATION BUTTON
         })
         .catch((err) => { console.log(err.response.data.message) })
         // SEE USER ROLE
         axios.get(process.env.REACT_APP_SERVER + "/v1/users", { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
         .then((res) => { setProfileData(res.data.data.role) })
         .catch((err) => { console.log(err.response.data.message) })
      }
   }, [])
   const changeCategory = (category) => {
      if(category !== productCategory) {
         setProductDetailData("")
         setProductCategory(category)  
      }
   }

   // use effect on category change
   useEffect(() => {
      if(productCategory === "Favourite") {
         axios.get(process.env.REACT_APP_SERVER + "/v1/product")
         .then((res) => { 
            setProductDetailData(res.data.data)
            setQueryPage("1")
            history.push("/Products?page=" + queryPage + "&limit=" + queryLimit)
         })
         .catch((err) => { console.log(err.response) })
      }
      else{
         const packCategory = {category: productCategory}
         axios.post(process.env.REACT_APP_SERVER + "/v1/product/cat", packCategory)
         .then((res) => { 
            setProductDetailData(res.data.data)
            setQueryPage("1")
            history.push("/Products?page=" + queryPage + "&limit=" + queryLimit)
         })
         .catch((err) => { setProductDetailData([]) })
      }
   }, [productCategory])

   // use effect on page change
   useEffect(() => { history.push("/Products?page=" + queryPage + "&limit=" + queryLimit) }, [queryPage])

   // PARSE QUERY STRING TO INTEGER (FOR FRONT-END PAGINATION / START FROM PAGE 1)
   const intPage = parseInt(queryPage) - 1
   const intLimit = parseInt(queryLimit)

   // SET-UP PAGINATION LOGIC (ALL)
   const calcPaginationBtn = Math.ceil(getProductDetail.length / intLimit)
   for(let i = 1; i <= calcPaginationBtn; i++) { howManyPaginationButton.push(i) }

   // format currency
   const formatRibuan = (uang) => {
      const sisa = uang.toString().length % 3
      let rupiah = uang.toString().substr(0, sisa)
      const ribuan = uang.toString().substr(sisa).match(/\d{3}/g);
      if (ribuan) {
         const separator = sisa ? '.' : '';
         rupiah += separator + ribuan.join('.');
      }
      return rupiah
   }

   // RETURN RESULT
   return(
      <div className="showInAnimation poppinsFont productsDesktop">
         <Helmet>
            <title>In Cafe - Our Products</title>
         </Helmet>
         <Navbar/>
         <div className="ourProducts fontPoppins">
            <div className="displayColumn ourProductsLeftSide">
               <p className="noMargin promoForYouText">Promo for you</p>
               <div className="thisIsPromoDescription">
                  <p className="noMargin couponsWillBeUpdatedText" style={{paddingTop: "1.5vw"}}>Coupons will be updated every weeks</p>
                  <p className="noMargin checkThemOutText" style={{paddingBottom: "1.5vw"}}>Check them out!</p>
               </div>
               <div className="displayRow productCoupons">
                  <div className="yellowProductCoupons">
                     <div className="yellowTopCoupons">
                        <img className="foodCouponFoodImg" src="https://doyanresep.com/wp-content/uploads/2018/12/cara-membuat-nasi-goreng-telur.jpg"/>
                        <p className="foodCouponTitle noMargin">Fried Rice</p>
                        <p className="foodCouponTitle">20% OFF</p>
                        <p className="noMargin foodCouponDescription">Buy 1 Choco Oreo and get 20% off for Fried Rice</p>
                     </div>
                     <div className="yellowBottomCoupons">
                        <p className="foodCouponCodeText">COUPON CODE</p>
                        <p className="foodCouponCode">3RW1N</p>
                        <p className="foodCouponCodeValid">Valid until October 10th 2020</p>
                     </div>
                  </div>
                  <div className="blackProductCoupons"/>
                  <div className="brownProductCoupons"/>
               </div>
               <div className="hideThisInDesktop"><CustomButton bgClr="#6A4029" brRad="3vw" btnPdg="3vw 15vw" ftSize="4vw" ftWg="600" mrgn="15vw 0 5vw 0" txClr="white" value="Apply Coupon"/></div>
               <div className="hideThisInMobile"><CustomButton bgClr="#6A4029" brRad="1vw" btnPdg="1vw 5vw" ftSize="1vw" ftWg="600" mrgn="3vw 0" txClr="white" value="Apply Coupon"/></div>
               {
               userProfileRole === "admin" ?
               <div className="hideThisInDesktop"><CustomButton bgClr="#FFBA33" brRad="3vw" btnPdg="3vw 13.3vw" ftSize="4vw" ftWg="bold" mrgn="0 0 7.5vw 0" txClr="#6A4029"  value="Add new promo"/></div>
               :
               null
               }
               <div className="couponsTermsAndCondition">
                  <p className="noMargin" style={{fontWeight: "bold"}}>Terms and Condition</p>
                  <p className="noMargin">1.) You can only apply 1 coupon per day</p>
                  <p className="noMargin">2.) It only for dine in</p>
                  <p className="noMargin">3.) Buy 1 get 1 only for new user</p>
                  <p className="noMargin">4.) Should make member card to apply coupon</p>
               </div>
               {
               userProfileRole === "admin" ? 
               <div className="hideThisInMobile"><CustomButton bgClr="#FFBA33" brRad="1vw" btnPdg="1.5vw 4.5vw" ftSize="1.5vw" ftWg="bold" mrgn="2.5vw 0 7.5vw 0" txClr="#6A4029"  value="Add new promo"/></div>
               : 
               null
               }
            </div>
            <div className="displayColumn ourProductsRightSide">
               <div className="displayRow productCategory">
                  <Link className="productCategoryBtn" onClick={ () => {changeCategory("Favourite")} } style={productCategory === "Favourite" ? {borderBottom: "0.2vw solid #6A4029", color: "#6A4029", fontWeight: "bold"} : null}>Favourite Product</Link>
                  <Link className="productCategoryBtn" onClick={ () => {changeCategory("coffe")} } style={productCategory === "coffe" ? {borderBottom: "0.2vw solid #6A4029", color: "#6A4029", fontWeight: "bold"} : null}>Coffee</Link>
                  <Link className="productCategoryBtn" onClick={ () => {changeCategory("NonCoffee")} } style={productCategory === "NonCoffee" ? {borderBottom: "0.2vw solid #6A4029", color: "#6A4029", fontWeight: "bold"} : null}>Non-Coffee</Link>
                  <Link className="productCategoryBtn" onClick={ () => {changeCategory("food")} } style={productCategory === "food" ? {borderBottom: "0.2vw solid #6A4029", color: "#6A4029", fontWeight: "bold"} : null}>Foods</Link>
                  <Link className="productCategoryBtn" onClick={ () => {changeCategory("AddOn")} } style={productCategory === "AddOn" ? {borderBottom: "0.2vw solid #6A4029", color: "#6A4029", fontWeight: "bold"} : null}>Add-on</Link>
               </div>
               <div className="row" style={{textAlign: "center"}}>
                  {getProductDetail === "" ?
                  <div style={{marginTop: "5.5vw", width: "100%"}}>
                     <img className="productsLoadingProcessImg" src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"/>
                  </div>
                  :
                  getProductDetail.slice(intLimit * intPage, intLimit * (intPage + 1)).map((item) => 
                  <div className="col-6 col-sm-3" style={{marginTop: "5vw"}}>
                     <div className="displayColumn foodProductBorder hoverThis" onClick={()=> {history.push("/ProductDetails/" + item.id)}}>
                        <img className="productsImageDisplaySize" src={item.image} style={{borderRadius: "50%", position: "absolute"}}/>
                        <div className="displayColumn" style={{height: "100%", justifyContent: "space-between"}}>
                           <div className="productFoodName">{item.name}</div>
                           <div className="productFoodPrice">{"IDR " + formatRibuan(item.price)}</div>
                        </div>
                     </div>
                  </div>
                  )
                  }
               </div>
               <div className="displayRow rubikFont" style={{justifyContent: "center", margin: "5vw 0", width: "100%"}}>
                  {howManyPaginationButton.map((item) => {
                     return <div onClick={() => {setQueryPage(item)}}>
                           <div className="hideThisInDesktop">
                              <CustomButton 
                              bgClr={item === parseInt(queryPage) ? "#6A4029" : "#F5F6F8"} 
                              brRad="1vw" 
                              btnPdg="3vw 5vw" 
                              ftSize="4vw" 
                              ftWg="bold" 
                              mrgn="0 3vw" 
                              txClr={item === parseInt(queryPage) ? "white" : "black"}
                              value={item}/>
                           </div>
                           <div className="hideThisInMobile">
                              <CustomButton 
                              bgClr={item === parseInt(queryPage) ? "#6A4029" : "#F5F6F8"} 
                              brRad="0.5vw" 
                              btnPdg="1vw 1.5vw" 
                              ftSize="1vw" 
                              ftWg="bold" 
                              mrgn="0 1vw" 
                              txClr={item === parseInt(queryPage) ? "white" : "black"}
                              value={item}/>
                           </div>
                        </div>
                  })}
               </div>
               <div>
                  {
                  userProfileRole === "admin" ? 
                  <div>
                     <div className="hideThisInDesktop" style={{textAlign: "center"}}>
                     <CustomButton 
                        bgClr="#6A4029" 
                        brRad="3vw" 
                        btnPdg="3vw 0" 
                        ftSize="4vw" 
                        ftWg="bold" 
                        mrgn="3vw 0 15vw 0" 
                        txClr="white" 
                        value="Add new product" 
                        wd="100%" 
                        onClick={() => {history.push("/admin/AddProduct")}}
                     /> 
                     </div>
                     <div className="hideThisInMobile">
                     <CustomButton 
                        bgClr="#6A4029" 
                        brRad="1vw" 
                        btnPdg="1.5vw 0" 
                        ftSize="1.5vw" 
                        ftWg="bold" 
                        mrgn="3vw 0 7.5vw 0" 
                        txClr="white" 
                        value="Add new product" 
                        wd="100%" 
                        onClick={() => {history.push("/admin/AddProduct")}}
                     /> 
                     </div>
                  </div>
                  : 
                  null
                  }
               </div>
            </div>
         </div>
         <Footer/>
      </div>
   )
}
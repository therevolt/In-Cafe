import './style.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { CustomButton } from '../../components/atoms'
import Navbar from '../../components/organisme/Navbar'
import { Link, useHistory } from 'react-router-dom'
import { Footer } from '../../components/templates'

export default function Products(){
   const [userProfileRole, setProfileData] = useState("")
   const [productCategory,setProductCategory] = useState("Favourite")
   const [getProductDetail, setProductDetailData] = useState([])
   const history = useHistory()
   // use effect
   useEffect(() => {
      // GET ALL PRODUCT STARTER
      axios.get(process.env.REACT_APP_SERVER + "/v1/product/")
      .then((res) => { setProductDetailData(res.data.data) })
      .catch((err) => { console.log(err.response) })
      // SEE USER ROLE
      axios.get(process.env.REACT_APP_SERVER + "/v1/users", { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
      .then((res) => { setProfileData(res.data.data.role) })
      .catch((err) => { console.log(err.response) })
   }, [])
   const changeCategory = (category) => {
      if(category !== productCategory) {
         setProductDetailData("")
         setProductCategory(category)  
      }
   }
   useEffect(() => {
      if(productCategory === "Favourite") {
         axios.get(process.env.REACT_APP_SERVER + "/v1/product/")
         .then((res) => { setProductDetailData(res.data.data) })
         .catch((err) => { console.log(err.response) })
      }
      else{
         const packCategory = {category: productCategory}
         axios.post(process.env.REACT_APP_SERVER + "/v1/product/cat", packCategory)
         .then((res) => { setProductDetailData(res.data.data) })
         .catch((err) => { setProductDetailData([]) })
      }
   }, [productCategory])
   return(
      <div className="showInAnimation poppinsFont productsDesktop">
         <Helmet>
            <title>In Cafe - Our Products</title>
         </Helmet>
         <Navbar/>
         <div className="displayRow ourProducts fontPoppins">
            <div className="displayColumn ourProductsLeftSide">
               <p className="noMargin promoForYouText">Promo for you</p>
               <p className="noMargin couponsWillBeUpdatedText" style={{paddingTop: "1.5vw"}}>Coupons will be updated every weeks</p>
               <p className="noMargin checkThemOutText" style={{paddingBottom: "1.5vw"}}>Check them out!</p>
               <div className="displayRow productCoupons">
                  <div className="yellowProductCoupons">
                     <div className="yellowTopCoupons">
                        <img src="https://doyanresep.com/wp-content/uploads/2018/12/cara-membuat-nasi-goreng-telur.jpg" style={{borderRadius: "50%", height: "8vw", marginBottom: "1vw"}}/>
                        <p className="foodCouponTitle noMargin">Fried Rice</p>
                        <p className="foodCouponTitle">20% OFF</p>
                        <p className="noMargin" style={{fontSize: "0.8vw", marginTop: "0.8vw"}}>Buy 1 Choco Oreo and get 20% off</p>
                        <p className="noMargin" style={{fontSize: "0.8vw"}}>for Fried Rice</p>
                     </div>
                     <div className="yellowBottomCoupons">
                        <p style={{fontSize: "1vw"}}>COUPON CODE</p>
                        <p style={{fontSize: "2vw", fontWeight: "bold"}}>3RW1N</p>
                        <p style={{fontSize: "0.7vw"}}>Valid until October 10th 2020</p>
                     </div>
                  </div>
                  <div className="blackProductCoupons"/>
                  <div className="brownProductCoupons"/>
               </div>
               <CustomButton bgClr="#6A4029" brRad="1vw" btnPdg="1vw 5vw" ftSize="1vw" ftWg="600" mrgn="3vw 0"  txClr="white" value="Apply Coupon"/>
               <div className="couponsTermsAndCondition">
                  <p className="noMargin" style={{fontWeight: "bold"}}>Terms and Condition</p>
                  <p className="noMargin">1.) You can only apply 1 coupon per day</p>
                  <p className="noMargin">2.) It only for dine in</p>
                  <p className="noMargin">3.) Buy 1 get 1 only for new user</p>
                  <p className="noMargin">4.) Should make member card to apply coupon</p>
               </div>
               {userProfileRole === "admin" ? <CustomButton bgClr="#FFBA33" brRad="1vw" btnPdg="1.5vw 4.5vw" ftSize="1.5vw" ftWg="bold" mrgn="2.5vw 0 7.5vw 0" txClr="#6A4029"  value="Add new promo"/> : null}
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
                     <img src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"/>
                  </div>
                  :
                  getProductDetail.slice(0,12).map((item) => 
                  <div className="col-sm-3" style={{marginTop: "5vw"}}>
                     <div className="displayColumn foodProductBorder hoverThis" onClick={()=> {history.push("/ProductDetails/" + item.id)}}>
                        <img src={item.image} style={{borderRadius: "50%", height: "8vw", top: "-3vw", position: "absolute", width: "8vw"}}/>
                        <div className="displayColumn" style={{height: "100%", justifyContent: "space-between"}}>
                           <div style={{fontSize: "1.3vw", fontWeight: "bold", marginTop: "5vw"}}>{item.name}</div>
                           <div style={{color: "#6A4029", fontSize: "1vw", fontWeight: "bold", margin: "1vw 0"}}>{"IDR " + item.price}</div>
                        </div>
                     </div>
                  </div>
                  )
                  }
               </div>
               <div>
                  {userProfileRole === "admin" ? <CustomButton bgClr="#6A4029" brRad="1vw" btnPdg="1.5vw 0" ftSize="1.5vw" ftWg="bold" mrgn="3vw 0 7.5vw 0" txClr="white" value="Add new product" wd="100%" onClick={() => {history.push("/admin/AddProduct")}}/> : null}
               </div>
            </div>
         </div>
         <Footer/>
      </div>
   )
}
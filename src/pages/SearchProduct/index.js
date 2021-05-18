import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { CustomButton } from '../../components/atoms'
import Navbar from '../../components/organisme/Navbar'
import { useHistory, useLocation } from 'react-router-dom'
import { Footer } from '../../components/templates'

export default function ProductSearch() {
    const { keywords } = useSelector(state => state.key)
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    function useQuery() { return new URLSearchParams(useLocation().search) }
    const query = useQuery()
    const [userProfileRole, setProfileData] = useState("")
    const history = useHistory()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER}/v1/product?name=${keywords}`)
            .then(response => {
                setData(response.data.data)
                setError('')
            })
            .catch(err=>{
                if(err.response.data.data == null){
                    setError(err.response.data.message)
                }
            })
        console.log(data);
    }, [keywords])
    return (
        <div className="showInAnimation poppinsFont productsDesktop">
            <Helmet>
                <title>In Cafe - Our Products</title>
            </Helmet>
            <Navbar />
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
                    <div className="displayRow rubikFont" style={{ justifyContent: "center", margin: "5vw 0", width: "100%" }}>
                        <div className="row text-center">
                            {(error == "Product Not Found")? <h2 className="text-danger">{error}</h2> : data.map(item => { 
                                return(
                                    <div className="col-6 col-sm-3" style={{marginTop: "5vw"}}>
                                        <div className="displayColumn foodProductBorder hoverThis" onClick={()=> {history.push("/ProductDetails/" + item.id)}}>
                                        <img className="productsImageDisplaySize" src={item.image} style={{borderRadius: "50%", position: "absolute"}}/>
                                        <div className="displayColumn" style={{height: "100%", justifyContent: "space-between"}}>
                                            <div className="productFoodName">{item.name}</div>
                                            <div className="productFoodPrice">{"IDR " + item.price}</div>
                                        </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
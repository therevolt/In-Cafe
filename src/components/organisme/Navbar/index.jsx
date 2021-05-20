import './style.css'
import React, { useEffect, useState } from 'react'
<<<<<<< HEAD
import {useDispatch} from 'react-redux'
=======
import {useDispatch, useSelector} from 'react-redux'
>>>>>>> 7cf0668ab8c550fdfddd5f629fb88cff0cf23483
import { Link, useHistory } from 'react-router-dom'
import CoffeeLogo from '../../atoms/CoffeeLogo'
import {BtnLg, CustomButton} from '../../atoms/'
import axios from 'axios'
import swal from 'sweetalert'

const Navbar = ()=>{
   const {products} = useSelector(state=>state.chart)
   const {data} = useSelector(state=>state.user)
   const dispatch = useDispatch()
   const [key, setKey] = useState("")
   const [userProfileData, setProfileData] = useState(localStorage.getItem("token") === null ? "" : {firstName: "User", lastName: "Name", displayName: "Loading data ...", avatar: "https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif", role: "member"})
   const [hamMenu, showHamMenu] = useState(false)
   const history = useHistory()
   const logOut = () => {
      localStorage.clear()
      swal("Berhasil logout!", "Mengarahkan kembali ke halaman login ~", "success")
      .then(() => { history.push("/user/Login") })
   }
   useEffect(() => {
   axios.get(process.env.REACT_APP_SERVER + "/v1/users", { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
   .then((res) => { setProfileData(res.data.data) })
   .catch((err) => { console.log(err.response.data.message) })
   }, [])
   const {firstName, lastName, displayName, avatar, role} = userProfileData
   const handleChangeKey = (e) => {
      setKey(e.target.value)
   }
   const Search = (e) => {
      e.preventDefault()
      if(key.length !== 0){
         dispatch({
            type : 'REQUEST_KEY',
            payload : key
         })
         history.push('/Search/Products')
      }
   }
   return(
      <div className="navbarReusable rubikFont">
         {/* NAVBAR - DESKTOP */}
         <div className="navbarDesktop">
               <div className="displayRow navbarInMobileState" style={{alignItems: "center", justifyContent: "space-between"}}>
                  <CoffeeLogo cls="coffeeLogoClass"/>
                  <img className="navHamMenuBtn hideThisInDesktop" onClick={ () => { showHamMenu(!hamMenu) } } src="https://cdn3.iconfinder.com/data/icons/mini-icon-set-general-office/91/General_-_Office_30-512.png"/>
               </div>
               <div className="hideThisInDesktop">
                  <div className={hamMenu === false ? "specialCaseForRightSideNav" : "displayRow navSearchAreaZoneOnly"} style={{alignItems: "center"}}>
                     <form className='mx-3' onSubmit={Search}>
                        <input type="text" placeholder="search" className="rounded-xl py-2 px-4 searchInputBoxNavbar" style={{border:"none",background:"#EFEEEE", outline:"none"}} onChange={handleChangeKey} />
                     </form>
                     <Link className="hoverThis" onClick={Search}><img className="searchNavbarButton" src="https://user-images.githubusercontent.com/77045083/113756261-621f1180-973b-11eb-94b0-e6ee1be8b9e4.png"/></Link>
                     <Link className="hoverThis hideThisInMobile" style={{margin: "0 3vw"}}><img src="https://user-images.githubusercontent.com/77045083/113756264-62b7a800-973b-11eb-82f5-d57d95e6e664.png" style={{height: "1.5vw"}}/></Link>
                     <div className="hideFirst col-md-1 dropdown hideThisInMobile">
                        <img className="dropdown-toggle hoverThis imgNavbar" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" src={avatar} style={{borderRadius:"50%"}}/>
                        <div className="hideFirst dropdown-menu dropdownUser" aria-labelledby="dropdownMenuButton">
                        <div className="userDropdownWrapper">
                              <div className="userDropdownArea">
                                 <img className="hoverThis userProfileImage" src={avatar}/>
                                 <div className="displayColumn userProfileNameAndTitle">
                                    <p className="mulishFont userProfileName">{firstName + " " + lastName}</p>
                                    <p className="mulishFont userProfileTitle">{displayName}</p>
                                 </div>
                              </div>
                              { role === "admin" ? 
                              <CustomButton bgClr="#FFBA33" txClr="black" brRad="0.5vw" btnPdg="0.5vw 4.1vw" ftSize="0.8vw" ftWg="600"value="Add new menu" onClick={() => {history.push("/admin/AddProduct")} }/>
                              : null }
                              <div className="userBtnArea">
                                 <Link to="/user/Profil"><CustomButton bgClr="#6A4029" txClr="white" brRad="0.5vw" btnPdg="0.5vw 1.9vw" ftSize="0.8vw" ftWg="600" value="Setting"/></Link>
                                 <CustomButton bgClr="indianred" txClr="white" brRad="0.5vw" btnPdg="0.5vw 1.9vw" ftSize="0.8vw" ftWg="600" value="Logout" onClick={ () => {logOut()} }/>
                              </div>
                        </div> 
                        </div>
                     </div>
                  </div>
               </div>
               <div className={hamMenu === false ? "hideThisInMobile navFourBtn" : "navFourBtn"}>
                  <div className="displayRow" style={{justifyContent: "space-between"}}>
                     <Link className="navBtn" onClick={ () => {localStorage.setItem("navbarState", "Home")} } style={localStorage.getItem("navbarState") === "Home" || localStorage.getItem("navbarState") === null ? {color: "#6A4029", fontWeight: "bold"} : null} to="/Home">Home</Link>
                     <Link className="navBtn" onClick={ () => {localStorage.setItem("navbarState", "Product")} } style={localStorage.getItem("navbarState") === "Product" ? {color: "#6A4029", fontWeight: "bold"} : null} to="/Products?page=1&amp;limit=4">Product</Link>
                     <div style={{display: "flex", flexDirection: "row", position:"relative"}}>
                        <Link className="navBtn" onClick={ () => {localStorage.setItem("navbarState", "Cart")} } style={localStorage.getItem("navbarState") === "Cart" ? {color: "#6A4029", fontWeight: "bold"} : null} to="/cart" >Your Cart</Link>
                        <div className="howMuchItemInCart position-absolute rounded p-1">{products.length}</div>
                     </div>
                     <Link className="navBtn" onClick={ () => {localStorage.setItem("navbarState", "History")} } style={localStorage.getItem("navbarState") === "History" ? {color: "#6A4029", fontWeight: "bold"} : null} to="/user/History">History</Link>
                  </div>
               </div>
               {localStorage.getItem("token") === null ?
               <div>
                  <div className="displayRow" style={{alignItems: "center"}}>
                     <Link className="navBtn hideThisInMobile" to="/user/Login">Login</Link>
                     <Link className="hideThisInMobile" to="/user/Signup"><CustomButton bgClr="#FFBA33" txClr="#6A4029" brRad="3vw" btnPdg="0.5vw 1.9vw" ftSize="1.1vw" ftWg="600" value="Sign Up"/></Link>
                  </div>
                  <div className={hamMenu === false ? "hideThisInMobile" : "displayRow navBtnMobileZoneAreaOnly"} style={{alignItems: "center"}}>
                     <Link className="navBtn hideThisInDesktop navLoginBtnSpecial" to="/user/Login">Login</Link>
                     <Link className="hideThisInDesktop" to="/user/Signup"><CustomButton bgClr="#FFBA33" txClr="#6A4029" brRad="3vw" btnPdg="1.5vw 4.5vw" ftSize="4vw" ftWg="600" value="Sign Up"/></Link>
                  </div>
               </div>
               :
               <div className="displayColumnInMobileOnly">
                  <div className={hamMenu === false ? "hideThisInDesktop hideThisInMobile" : "hideThisInDesktop userDropdownAreaSpecialInMobileOnly"}>
                     <div className="displayColumn" style={{alignItems: "center", justifyContent: "center"}}>
                        <img className="hoverThis userProfileImage" src={avatar}/>
                        <div className="displayColumn userProfileNameAndTitle">
                           <p className="mulishFont homeBigText" style={{marginTop: "5vw" , marginBottom: "0"}}>{firstName + " " + lastName}</p>
                           <p className="mulishFont homeMediumText">{displayName}</p>
                        </div>
                     </div>
                     { role === "admin" ? 
                     <div style={{textAlign: "center"}}><CustomButton bgClr="#FFBA33" txClr="black" brRad="3.3vw" btnPdg="3vw 21vw" ftSize="4vw" ftWg="600"value="Add new menu" onClick={() => {history.push("/admin/AddProduct")} }/></div>
                     : null }
                     <div className="userBtnArea">
                        <Link to="/user/Profil"><CustomButton bgClr="#6A4029" txClr="white" brRad="2.2vw" btnPdg="3vw 9vw" ftSize="4vw" ftWg="600" value="Setting"/></Link>
                        <CustomButton bgClr="indianred" txClr="white" brRad="2.2vw" btnPdg="3vw 9vw" ftSize="4vw" ftWg="600" value="Logout" onClick={ () => {logOut()} }/>
                     </div>
                  </div>
                  <div className="hideThisInMobile">
                     <div className={hamMenu === false ? "specialCaseForRightSideNav" : "displayRow navSearchAreaZoneOnly"} style={{alignItems: "center"}}>
                        <form className='mx-3' onSubmit={Search}>
                           <input type="text" placeholder="search" className="rounded-xl py-2 px-4 searchInputBoxNavbar" style={{border:"none",background:"#EFEEEE", outline:"none"}} onChange={handleChangeKey} />
                        </form>
                        <Link className="hoverThis" onClick={Search}><img className="searchNavbarButton" src="https://user-images.githubusercontent.com/77045083/113756261-621f1180-973b-11eb-94b0-e6ee1be8b9e4.png"/></Link>
                        <Link className="hoverThis hideThisInMobile" style={{margin: "0 3vw"}}><img src="https://user-images.githubusercontent.com/77045083/113756264-62b7a800-973b-11eb-82f5-d57d95e6e664.png" style={{height: "1.5vw"}}/></Link>
                        <div className="hideFirst col-md-1 dropdown hideThisInMobile">
                           <img className="dropdown-toggle hoverThis imgNavbar" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" src={avatar} style={{borderRadius:"50%"}}/>
                           <div className="hideFirst dropdown-menu dropdownUser" aria-labelledby="dropdownMenuButton">
                           <div className="userDropdownWrapper">
                                 <div className="userDropdownArea">
                                    <img className="hoverThis userProfileImage" src={avatar}/>
                                    <div className="displayColumn userProfileNameAndTitle">
                                       <p className="mulishFont userProfileName">{firstName + " " + lastName}</p>
                                       <p className="mulishFont userProfileTitle">{displayName}</p>
                                    </div>
                                 </div>
                                 { role === "admin" ? 
                                 <CustomButton bgClr="#FFBA33" txClr="black" brRad="0.5vw" btnPdg="0.5vw 4.1vw" ftSize="0.8vw" ftWg="600"value="Add new menu" onClick={() => {history.push("/admin/AddProduct")} }/>
                                 : null }
                                 <div className="userBtnArea">
                                    <Link to="/user/Profil"><CustomButton bgClr="#6A4029" txClr="white" brRad="0.5vw" btnPdg="0.5vw 1.9vw" ftSize="0.8vw" ftWg="600" value="Setting"/></Link>
                                    <CustomButton bgClr="indianred" txClr="white" brRad="0.5vw" btnPdg="0.5vw 1.9vw" ftSize="0.8vw" ftWg="600" value="Logout" onClick={ () => {logOut()} }/>
                                 </div>
                           </div> 
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               }
         </div>
      </div>
   )
}

export default Navbar
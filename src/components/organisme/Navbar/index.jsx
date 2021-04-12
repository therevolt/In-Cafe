import './style.css'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import CoffeeLogo from '../../atoms/CoffeeLogo'
import {BtnLg, CustomButton} from '../../atoms/'
import axios from 'axios'
import swal from 'sweetalert'

const Navbar = ()=>{
   const [userProfileData, setProfileData] = useState(localStorage.getItem("token") === null ? "" : {firstName: "User", lastName: "Name", displayName: "Loading data ...", avatar: "https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif", role: "member"})
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
   return(
      <div className="navbarReusable rubikFont">
         {/* NAVBAR - DESKTOP */}
         <div className="navbarDesktop">
               <CoffeeLogo logoWidth="11vw"/>
               <div className="displayRow navFourBtn">
                  <Link className="navBtn" onClick={ () => {localStorage.setItem("navbarState", "Home")} } style={localStorage.getItem("navbarState") === "Home" || localStorage.getItem("navbarState") === null ? {color: "#6A4029", fontWeight: "bold"} : null} to="/Home">Home</Link>
                  <Link className="navBtn" onClick={ () => {localStorage.setItem("navbarState", "Product")} } style={localStorage.getItem("navbarState") === "Product" ? {color: "#6A4029", fontWeight: "bold"} : null} to="/Products">Product</Link>
                  <Link className="navBtn" onClick={ () => {localStorage.setItem("navbarState", "Cart")} } style={localStorage.getItem("navbarState") === "Cart" ? {color: "#6A4029", fontWeight: "bold"} : null}>Your Cart</Link>
                  <Link className="navBtn" onClick={ () => {localStorage.setItem("navbarState", "History")} } style={localStorage.getItem("navbarState") === "History" ? {color: "#6A4029", fontWeight: "bold"} : null} to="/user/History">History</Link>
               </div>
               {localStorage.getItem("token") === null ?
               <div className="displayRow" style={{alignItems: "center"}}>
                  <Link className="navBtn" to="/user/Login">Login</Link>
                  <Link to="/user/Signup"><CustomButton bgClr="#FFBA33" txClr="#6A4029" brRad="3vw" btnPdg="0.5vw 1.9vw" ftSize="1.1vw" ftWg="600" value="Sign Up"/></Link>
               </div>
               :
               <div className="displayRow" style={{alignItems: "center"}}>
                  <Link className="hoverThis"><img src="https://user-images.githubusercontent.com/77045083/113756261-621f1180-973b-11eb-94b0-e6ee1be8b9e4.png" style={{height: "1vw"}}/></Link>
                  <Link className="hoverThis" style={{margin: "0 3vw"}}><img src="https://user-images.githubusercontent.com/77045083/113756264-62b7a800-973b-11eb-82f5-d57d95e6e664.png" style={{height: "1.5vw"}}/></Link>
                  <div className="hideFirst col-md-1 dropdown">
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
               }
         </div>
      </div>
   )
}

export default Navbar
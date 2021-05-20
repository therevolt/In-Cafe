import './style.css'
import {useState} from 'react'
import { Helmet } from 'react-helmet'
import {useHistory} from 'react-router-dom'
import { MainInput, BtnLg, CustomButton } from '../../components/atoms'
import { Footer } from '../../components/templates'
import axios from 'axios'
import swal from 'sweetalert'

export default function ForgotPassword(){
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [resendEmail, showResendEmail] = useState(false)
    function handleChange(e){
        setEmail(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        axios({
            method : 'POST',
            url : `${process.env.REACT_APP_SERVER}/v1/users/reset`,
            data : {
                email : email
            }
        })
        .then(response=>{
            swal('Berhasil', response.data.message, 'success')
            showResendEmail(true)
        })
        .catch(err=>{ 
            if(err.response.status == 404){
                swal('Oops', err.response.data.message)
            } 
        })
    }
    return(
        <div className="showInAnimation poppinsFont">
            <Helmet>
                <title>In Cafe - Forgot Password</title>
            </Helmet>
            <div className="forgotPasswordDesktop">
                <div className="displayColumn forgotPassword">
                    <div className="forgotPasswordTitle" style={{textAlign: "center", marginTop: "10vh"}}>
                        <h3 className="forgotPasswordBigText">Forgot your password?</h3>
                        <p className="forgotPasswordSmallText">Don't worry, we got your back!</p>
                    </div>
                    <form className="displayRow forgotPasswordInput" onSubmit={ (e) => { handleSubmit(e) } }>
                        <MainInput label={null} placeholder="Enter your email address to get link" style={{borderRadius: "0.5vw", fontSize: "1vw", height: "3.8vw", width: "39vw"}} type="email" onChange={handleChange} required/>
                        <CustomButton bgClr="#FFBA33" txClr="#6A4029" brRad="0.5vw" btnPdg="1vw 3vw" ftSize="1.1vw" ftWg="600" mrgn="0.5vw 0 0 1vw" value="Send"/>
                    </form>
                    <div className="forgotPasswordResendLink" style={resendEmail === false ? {visibility: "hidden"} : null}>
                        <p style={{color: "white", fontSize: "1.5vw", opacity: "0.5", textAlign: "center"}}>Still not receiving any email from us? <br/> How about we resend you another email?</p>
                        <CustomButton bgClr="#6A4029" txClr="white" brRad="0.5vw" btnPdg="1.5vw 9vw" ftSize="1.1vw" ftWg="600" mrgn="1vw 0" onClick={ (e) => { handleSubmit(e) }} value="Resend Link"/>
                    </div>
                </div>
            </div>
            <div className="forgotPasswordMobile">
                <p className="dontWorryText">Don't worry!</p>
                <p className="getPasswordLinkText">Enter your email address to get reset password link</p>
                <img style={{margin: "24px 0"}} src="https://user-images.githubusercontent.com/77045083/113750005-74e21800-9734-11eb-9eab-027d6f927aa6.png"/>
                <form onSubmit={ (e) => { handleSubmit(e) } }>
                    <input className="inputForgotPassword" placeholder="Enter your email address"/>
                    <p style={{margin: "24px 0"}}>Haven't received any link?</p>
                    <CustomButton bgClr="#6A4029" txClr="white" brRad="20px" btnPdg="20px 100px" ftSize="16px" ftWg="600" mrgn="1vw 0" value="Resend Link"/>
                </form>
            </div>
            <div className="forgotPasswordFooter">
                <Footer/>
            </div>
        </div>
    )
}
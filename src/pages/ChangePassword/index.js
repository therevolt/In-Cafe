import {useState} from 'react'
import { Helmet } from 'react-helmet'
import {useHistory, useLocation} from 'react-router-dom'
import { MainInput, BtnLg, CustomButton } from '../../components/atoms'
import { Footer } from '../../components/templates'
import axios from 'axios'
import swal from 'sweetalert'

export default function ChangePassword(){
    const history = useHistory()
    const [password, setPassword] = useState('')
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    const token = query.get('token')
    function handleChange(e){
        setPassword(e.target.value)
    }
    function handleSubmit(){
        axios({
            method : 'PUT',
            url : `${process.env.REACT_APP_SERVER}/v1/users/reset`,
            data : {
                password : password
            },
            headers : { Authorization : `Bearer ${token}` }
        })
        .then(response=>{
            swal('Berhasil', response.data.message, 'success')
            history.push('/user/login')
        })
        .catch(err=>{
            if(err.response.status == 500){
                swal('Oops', err.response.data.message, 'error')
            }
        })
        console.log(password);
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
                    <div className="displayRow forgotPasswordInput">
                        <MainInput label={null} placeholder="Write Your New Password" style={{borderRadius: "0.5vw", fontSize: "1vw", height: "3.8vw", width: "39vw"}} type="email" onChange={handleChange} type='Password' required/>
                        <BtnLg value="Send" color="btn-orange" rounded="rounded-lg" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
            <div className="forgotPasswordMobile">
                <p className="dontWorryText">Don't worry!</p>
                <p className="getPasswordLinkText">Enter your email address to get reset password link</p>
                <img style={{margin: "24px 0"}} src="https://user-images.githubusercontent.com/77045083/113750005-74e21800-9734-11eb-9eab-027d6f927aa6.png"/>
                <form>
                    <input className="inputForgotPassword" placeholder="Write Your New Password" onChange={handleChange} />
                    <p style={{margin: "24px 0"}}>Haven't received any link?</p>
                    <CustomButton bgClr="#6A4029" txClr="white" brRad="20px" btnPdg="20px 100px" ftSize="16px" ftWg="600" mrgn="1vw 0" value="Resend Link" onClick={handleSubmit} />
                </form>
            </div>
            <div className="forgotPasswordFooter">
                <Footer/>
            </div>
        </div>
    )
}
import React,{useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import {useDispatch } from 'react-redux'
import axios from 'axios'
import swal from 'sweetalert'
// -----------component-------------
import {CardFly} from '../organisme'
import {MainInput, CustomButton, Heading5} from '../atoms'
import {Logo} from '../molekuls'
// ----img-------
import img from '../../assets/img-1.png'
function AuthLogin() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [data, setData] = useState({
        email : '',
        password : '',
    })
    function handleEmailChange(e){
        setData({
            ...data,
            email : e.target.value
        })
    }
    function handlePasswordChange(e){
        setData({
            ...data,
            password : e.target.value
        })
    }
    function handleSubmit(e){
        axios({
            method : 'POST',
            url : `${process.env.REACT_APP_SERVER}/v1/users/login`,
            data : {
                email : data.email,
                password : data.password,
            }
        })
        .then(response=>{
            localStorage.setItem('token',response.data.data.token)
            history.push('/home')
            swal('success', response.data.message, 'success')
            dispatch({
                type : 'REQUEST_LOGIN',
                payload : response.data.data
            })
        })
        .catch(err=>{
            if(err.response.status == 400){
                swal('Oops',err.response.data.message,'error')
            }
        })
    }
    return (
        <div className='container-fluid position-relative'>
            <div className="row">
                <div className="col-12 col-md-6 show-in-md">
                    <img src={img} className='img-fluid'/>
                </div>
                <div className="col-12 col-md-5">
                    <div className="d-flex my-4 justify-content-between">
                        <div>
                            <Logo />
                        </div>
                        <div>
                            <Link to='/user/signup'><CustomButton bgClr="#FFBA33" brRad="0.5vw" btnPdg="0.5vw 3vw" ftSize="1.1vw" ftWg="bold" mrgn="0.77vw 0" txClr="#6A4029" value="SignUp" wd="auto"></CustomButton></Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className='text-center mb-5'>
                                <Heading5 value='Login' />
                            </div>
                            <div className='my-4'>
                                <MainInput label='Email Adress:' placeholder='Enter Your Email Adress' onChange={handleEmailChange} />
                            </div>
                            <div className='my-4'>
                                <MainInput label='Password:' placeholder='Enter Your Password' type='password' onChange={handlePasswordChange} />
                            </div>
                            <div className='my-3'>
                                <Link to='/user/forgotpassword'><p className='text-coklat font-weight-bold m-0'>Forgot Password ?</p></Link>
                            </div>
                            <div>
                                <CustomButton bgClr="#FFBA33" brRad="1vw" btnPdg="1rem 3rem" ftSize="1.1rem" ftWg="bold" mrgn="0.77vw 0" txClr="white" value="Login" wd="100%" onClick={handleSubmit}></CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CardFly />
        </div>
    )
}

export default AuthLogin

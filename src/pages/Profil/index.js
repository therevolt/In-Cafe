import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { InputNoBorder, BtnPen, TextAreaNoBorder, CheckBox, CustomButton } from '../../components/atoms'
import {Navbar} from '../../components/organisme'
import {Footer} from '../../components/templates'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import swal from 'sweetalert'
function Profil() {
    const history = useHistory()
    const dispatch = useDispatch()
    const {data} = useSelector(state=>state.user)
    const [dataUser, setDataUser] = useState({
        avatar : '',
        email : '',
        phone : '',
        address : '',
        displayName : '',
        firstName: '',
        lastName : '',
        birthday : '',
        gender : ''
    })
    useEffect(()=>{
        setDataUser({
            avatar : data.avatar,
            email : data.email,
            phone : data.phone,
            address : data.address,
            displayName : data.displayName,
            firstName: data.firstName,
            lastName : data.lastName,
            birthday : data.birthday,
            gender : data.gender
        })
    },[data])
    function handleLogOut(){
        localStorage.remove('token')
        history.push('/user/login')
    }
    function handleSubmit(){
        const formData = new FormData()
        const token = localStorage.getItem('token')
        // if(data.avatar == dataUser.avatar){

        // }
        formData.append('avatar', dataUser.avatar)
        formData.append('email', dataUser.email)
        formData.append('phone', dataUser.phone)
        formData.append('address', dataUser.address)
        formData.append('displayName', dataUser.displayName)
        formData.append('firstName', dataUser.firstName)
        formData.append('lastName', dataUser.lastName)
        formData.append('birthDay', dataUser.birthDay)
        formData.append('gender', dataUser.gender)
        axios({
            method : 'PUT',
            url : `${process.env.REACT_APP_SERVER}/v1/users`,
            data : formData,
            headers : { Authorization: `Bearer ${token}` }
        })
        .then(response=>{
            dispatch({
                type : 'LOGIN_REQUEST',
                payload : response.data.data
            })
            swal('Berhasil', response.data.message, 'success')
        })
    }
    return (
        <div className='showInAnimation poppinsFont'>
            <Navbar />
            <div className='container-fluid bg-profil'>
                <div className="container mx-auto">
                    <div className="row">
                        <div className="col-10 col-lg-4 my-2 my-lg-5 mx-auto">
                            <div className='card-profil bg-white py-4 px-4 text-center shadow'>
                                <div className='mb-3 px-5 position-relative mt-4 mx-auto' style={{ width: 260 }}>
                                    <img src={dataUser.avatar} className='rounded-circle w-100' />
                                    {/* <div className='position-absolute' style={{ right: 65, top: 125 }}> */}
                                        {/* <BtnPen /> */}
                                    {/* </div> */}
                                </div>
                                <div className='my-2'>
                                    <input type="file" className='form-control' onChange={(e)=>{setDataUser({...dataUser, avatar : e.target.files[0]})}} />
                                </div>
                                <div className='my-3'>
                                    <h3 className='fw-600 m-0'>{data.displayName}</h3>
                                    <p className='fs-12'>{data.email}</p>
                                </div>
                                <div className='my-4'>
                                    <p>hash been Ordered 6 Products</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 col-lg-8 my-2 my-lg-5 mx-auto">
                            <div className='card-profil bg-white py-4 px-4 shadow'>
                                <div className="d-flex justify-content-between">
                                    <div className='align-self-center'>
                                        <h4>Contacts</h4>
                                    </div>
                                    <BtnPen />
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <InputNoBorder
                                            label='Email Adress :'
                                            value={dataUser.email}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <InputNoBorder
                                            label='Mobile number :'
                                            type='number'
                                            value={dataUser.phone}
                                            onChange={(e)=>{
                                                setDataUser({...dataUser, phone : e.target.value})
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <TextAreaNoBorder
                                            label='Delivery adress :'
                                            row='1'
                                            value={dataUser.address}
                                            onChange={(e)=>{
                                                setDataUser({...dataUser, address : e.target.value})
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 col-lg-8 my-2 my-lg-5 mx-auto">
                            <div className='card-profil bg-white py-4 px-4 shadow'>
                                <div className="d-flex justify-content-between">
                                    <div className='align-self-center'>
                                        <h4>Details</h4>
                                    </div>
                                    <BtnPen />
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-8">
                                        <InputNoBorder
                                            label='Display name :'
                                            value={dataUser.displayName}
                                            onChange={(e)=>{
                                                setDataUser({...dataUser, displayName : e.target.value})
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <InputNoBorder
                                            label='DD/MM/YY'
                                            type='date'
                                            value={dataUser.birthday}
                                            onChange={(e)=>{
                                                setDataUser({...dataUser, birthday : e.target.value})
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 col-md-8">
                                        <InputNoBorder
                                            label='First name :'
                                            row='1'
                                            value={dataUser.firstName}
                                            onChange={(e)=>{
                                                setDataUser({...dataUser, firstName : e.target.value})
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className='my-3'>
                                            <div>
                                                <input type="radio" name='male' className='mr-3' />
                                                <label htmlFor="male">Male</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='female' className='mr-3'/>
                                                <label htmlFor="Female">Female</label>
                                            </div>
                                            {/* <div className='my-3'>
                                                <CheckBox
                                                    label='Male'
                                                />
                                            </div>
                                            <div className='my-3'>
                                                <CheckBox
                                                    label='Female'
                                                />
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-8">
                                        <InputNoBorder
                                            label='Last name :'
                                            row='1'
                                            value={dataUser.lastName}
                                            onChange={(e)=>{
                                                setDataUser({...dataUser, lastName : e.target.value})
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 col-lg-4 my-2 my-lg-5 mx-auto">
                            <div className='mt-5 mt-lg-0'>
                                <h4 className='text-white fw-700 pb-4'>Do you want to save the change?</h4>
                                <div className='my-2'>
                                    <CustomButton bgClr="#6A4029" brRad="1vw" btnPdg="1rem 3rem" ftSize="1.1rem" ftWg="bold" mrgn="0.33vw 0" txClr="white" value="Save Changes" wd="100%" onClick={handleSubmit} ></CustomButton>
                                    <CustomButton bgClr="#FFBA33" brRad="1vw" btnPdg="1rem 3rem" ftSize="1.1rem" ftWg="bold" mrgn="0.33vw 0" txClr="#6A4029" value="Cancel" wd="100%"></CustomButton>
                                </div>
                                <div className='my-2'>
                                    <CustomButton bgClr="#FFFFFF" brRad="1vw" btnPdg="1rem 3rem" ftSize="1.1rem" ftWg="bold" mrgn="0.33vw 0" txClr="#6A4029" value="Edit Password" wd="100%"></CustomButton>
                                    <CustomButton bgClr="#FFFFFF" brRad="1vw" btnPdg="1rem 3rem" ftSize="1.1rem" ftWg="bold" mrgn="0.33vw 0" txClr="#6A4029" value="Log Out" wd="100%" onClick={handleLogOut} ></CustomButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profil

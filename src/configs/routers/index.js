import {Login, Profil, SignUp, Products, SearchProduct, ProductDetails, ForgotPassword, History, Homepage, AddProduct, UserVerify, Payment, ChangePassword, EditProduct} from '../../pages'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import {useEffect} from 'react'

import React from 'react'

function Routers() {
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    useEffect(()=>{
        if(token != null){
            axios({
                method : 'GET',
                url : `${process.env.REACT_APP_SERVER}/v1/users`,
                headers : { Authorization: `Bearer ${token}` }
            })
            .then(response=>{
                dispatch({
                    type : 'REQUEST_LOGIN',
                    payload : response.data.data
                })
            })
            .catch(err=>{
                if(err.response.data.status == false){
                    localStorage.removeItem('token')
                }
            })
        }
    },[])
    return (
        <Router>
            <Switch>
                <Route path='/user/Profil' component={Profil} />
                <Route path='/user/Login' component={Login} />
                <Route path='/user/SignUp' component={SignUp} />
                <Route path='/user/ForgotPassword' component={ForgotPassword} />
                <Route path='/user/Payment' component={Payment} />
                <Route path='/user/History' component={History} />
                <Route path='/verify' component={UserVerify} />
                <Route path='/reset' component={ChangePassword} />
                <Route path='/Products' component={Products} />
                <Route path='/ProductDetails/:id' component={ProductDetails} />
                <Route path='/admin/AddProduct' component={AddProduct} />
                <Route path='/admin/EditProduct/:id' component={EditProduct} />
                <Route path='/Search/Products' component={SearchProduct} />
                <Route path='/home' component={Homepage} />
                <Route path='/' component={Homepage} />
            </Switch>
        </Router>
    )
}

export default Routers

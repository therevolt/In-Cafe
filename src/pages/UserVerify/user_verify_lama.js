import React, {useState} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import axios from 'axios'

function UserVerify() {
    // ini hanya halaman kosong untuk verify email win
    const [message, setMessage] = useState({
        error : ''
    })
    const history = useHistory()
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    const token = query.get('token')
    axios({
        method : 'GET',
        url : `${process.env.REACT_APP_SERVER}/v1/users/verify`,
        headers : { Authorization: `Bearer ${token}` }
    })
    .then(response=>{
        if(response.data.status == true){
            history.push('/user/login')
        }
    })
    .catch(err => {
        if(err){
            setMessage({
                error : 'ERROR 500 Server Down !!!'
            })
        }
    })
    return (
        <div className='container'>
            <h1 className='text-center color-gray mt-5'>{message.error}</h1>
        </div>
    )
}

export default UserVerify

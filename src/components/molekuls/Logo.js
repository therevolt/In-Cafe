import React from 'react'
import lg from '../../assets/lg.png'
function Logo() {
    return (
        <div className='d-flex mb-4'>
            <img src={lg} alt=""/>
            <h4 className='ml-2 mb-0 align-self-center fw-700'>Coffee Shop</h4>
        </div>
    )
}

export default Logo

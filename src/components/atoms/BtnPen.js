import React from 'react'
import pen from '../../assets/pen.png'
function BtnPen({onClick}) {
    return (
        <div className='btn-pen btn-pen-sm' onClick={onClick}>
            <div>
                <img src={pen}/>
            </div>
        </div>
    )
}

export default BtnPen

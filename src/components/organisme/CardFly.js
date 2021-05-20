import React from 'react'
import {CustomButton} from '../atoms'
function CardFly() {
    return (
        <div className='container rounded-md bg-white shadow py-4 px-5 card-fly-position show-in-md'>
            <div className="d-flex justify-content-between">
                <div>
                    <h3>Get your member card now!</h3>
                    <p>Let's join with our member and enjoy the deals.</p>
                </div>
                <CustomButton bgClr="#FFBA33" brRad="0.5vw" btnPdg="0.5vw 3vw" ftSize="1.1vw" ftWg="bold" mrgn="0.77vw 0" txClr="#6A4029" value="Create Now" wd="auto"></CustomButton>
            </div>
        </div>
    )
}

export default CardFly

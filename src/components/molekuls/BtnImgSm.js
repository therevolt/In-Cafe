import React from 'react'

function BtnImgSm({img, ...rest}) {
    return (
        <div className='c-pointer'>
            <img src={img} {...rest}/>
        </div>
    )
}

export default BtnImgSm

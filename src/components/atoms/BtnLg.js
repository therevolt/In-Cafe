import React from 'react'
function BtnLg({value, color, rounded, ...rest}){
    return (
        <div>
            <button className={'btn-lg ' + color + ' ' + rounded} {...rest}>{value}</button>
        </div>
    )
}

export default BtnLg

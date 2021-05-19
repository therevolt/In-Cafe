import React from 'react'
function BtnSm({value, color, rounded}){
    return (
        <div>
            <button className={'btn-sm ' + color + ' ' + rounded} >{value}</button>
        </div>
    )
}

export default BtnSm

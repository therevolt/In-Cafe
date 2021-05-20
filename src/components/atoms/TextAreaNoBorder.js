import React from 'react'

function TextAreaNoBorder({name, label, row, value}) {
    return (
        <div className='my-3'>
            <label htmlFor={name} className='d-block label-for-main-input color-gray' >{label}</label>
            <textarea cols="30" rows={row} name={name} className='input-style-2 w-100' value={value}></textarea>
        </div>
    )
}

export default TextAreaNoBorder

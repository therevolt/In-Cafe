import React, {useState} from 'react'
import style from './ChekBox.module.css'
function CheckBox({label}) {
    const [toggle, setToggle] = useState('')
    function handleToggle(e){
        setToggle(e.target.checked)
        console.log(toggle);
    }
    return (
        <div className='d-flex'>
            <div className={(toggle == false)?'bg-transparent rounded-circle d-flex ' + style.size:'btn-orange rounded-circle d-flex ' + style.size}>
                <input type="Checkbox" name='checkbox'onClick={handleToggle} className={'align-selft-center '+style.visibilityHide} />
            </div>
            <label htmlFor="checkbox" className={(toggle == false)?'d-block label-for-main-input color-gray ml-3 mb-0 align-self-center':'d-block label-for-main-input ml-3 mb-0 align-self-center'}>{label}</label>
        </div>
    )
}

export default CheckBox

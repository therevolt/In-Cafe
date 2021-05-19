import React from 'react'
import { BtnImgSm, Logo } from '../molekuls'
// -----image------
import fb from '../../assets/fb.png'
import ig from '../../assets/ig.png'
import twt from '../../assets/twt.png'
// ----------------

function Footer() {
    return (
        <div className="bg-gray-1 pb-5 pt-10">
            <div className='container'>
                <div className="row">
                    <div className="col-12 col-md-12 col-lg-8 mb-3">
                        <Logo />
                        <div>
                            <p className='fw-500 fc-1 mw-400'>Coffee Shop is a store that sells some good meals, and especially coffee. We provide high quality beans</p>
                        </div>
                        <div className='d-flex'>
                            <BtnImgSm img={fb} className='mr-2'/>
                            <BtnImgSm img={ig} className='mr-2'/>
                            <BtnImgSm img={twt}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-2 my-3 my-lg-0">
                        <ul>
                            <li><p className='fw-700 mb-4'>Download</p></li>
                            <li className='fc-1'>Download</li>
                            <li className='fc-1'>Pricing</li>
                            <li className='fc-1'>Locations</li>
                            <li className='fc-1'>Countries</li>
                            <li className='fc-1'>Blog</li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-12 col-lg-2 my-3 my-lg-0">
                        <ul>
                            <li><p className='fw-700 mb-4'>Engage</p></li>
                            <li className='fc-1'>Coffee Shop?</li>
                            <li className='fc-1'>FAQ</li>
                            <li className='fc-1'>About Us</li>
                            <li className='fc-1'>Privacy Policy</li>
                            <li className='fc-1'>Terms of Service</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer

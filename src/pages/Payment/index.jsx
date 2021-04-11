import React from 'react'
import {Heading5,BtnLg} from '../../components/atoms'
import {Navbar} from '../../components/organisme'
import {Footer} from '../../components/templates'
// img
import img_dummy from '../../assets/img_dummy_1.png'
import axios from 'axios'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'

function Payment() {
    const history = useHistory()
    const setupPayment = () => {
        if(localStorage.getItem("transactionId") === null) {alert("Invalid payment")}
        else {
            const orderData = {
                productId: localStorage.getItem("productId"),
                transactionId: localStorage.getItem("transactionId"),
                sizeProduct: localStorage.getItem("sizeProduct")
            }
            axios.post(process.env.REACT_APP_SERVER + "/v1/order", orderData, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then((res) => { 
                console.log(res.data.data)
                swal("Berhasil!", "Pesanan selesai, makanan kamu akan segera di proses ~", "success").then(() => {history.push("/user/History")}) })
            .catch((err) => { console.log(err.response) })
        }
    }
    return (
        <div className="showInAnimation homepageDesktop">
            <Navbar />
            <div className='container-fluid py-5 bg-payment'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-3">
                            <h2 className='text-white font-weight-bold'>Checkout your item now!</h2>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-12 col-lg-5">
                            {/* card */}
                            <div className='bg-white rounded-md px-4 py-4'>
                                <div className='my-5 text-center'>
                                    <h3 className='font-weight-bold m-0 text-coklat'>Order Sumary</h3>
                                </div>
                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <div className='align-self-center'>
                                        <div className="d-flex">
                                            {/* <img src={img_dummy} />
                                            <p className='m-0 mx-4 align-self-center text-black'>Hazelnut Lattex 1 Regular</p> */}
                                        </div>
                                    </div>
                                    <div className='align-self-center'>
                                        {/* <p>IDR 80K</p> */}
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between py-2'>
                                    <div className="d-flex justify-content-between">
                                        {/* <p className='m-0'>SubTotal</p>
                                        <p className='m-0'>IDR 100.000</p> */}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <Heading5
                                    value='TOTAL'
                                    />
                                    <Heading5
                                    value='IDR 150.000'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-5 ml-auto">
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex justify-content-between mt-5">
                                        <h3 className='fw-700 text-white mb-3'>Address details</h3>
                                        <p className='fw-700 text-white mb-0'>Edit</p>
                                    </div>
                                    <div className='bg-white rounded-md px-4 py-4'>
                                        <div className='border-bottom'>
                                            <p><strong>Delivery</strong> to Iskandar Street</p>
                                        </div>
                                        <div className='border-bottom my-3'>
                                            <p>Km 5 refinery road oppsite republic road, effurun, Jakarta</p>
                                        </div>
                                        <div className='my-3'>
                                            <p>+62 81348287878</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 my-5">
                                    <div className="d-flex">
                                        <h3 className='fw-700 text-white mb-3'>Payment Method</h3>
                                    </div>
                                    <div className='bg-white rounded-md px-4 py-4'>
                                        <div className='border-bottom'>
                                            {/* <div className="d-flex">
                                                <input type="radio" />
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <BtnLg 
                                    value='Confirm and Pay'
                                    color='btn-coklat'
                                    rounded='rounded-md'
                                    onClick={() => {setupPayment()}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Payment

import React, { useEffect, useState } from 'react'
import { Heading5, BtnLg } from '../../components/atoms'
import { Navbar } from '../../components/organisme'
import { Footer } from '../../components/templates'
// img
import img_dummy from '../../assets/img_dummy_1.png'
import axios from 'axios'
import swal from 'sweetalert'
import { useHistory, Link } from 'react-router-dom'
import { CustomButton } from '../../components/atoms'
import { useSelector, useDispatch } from 'react-redux'

function Payment() {
    const transaction = localStorage.getItem("_IdTransaction")
    const dispatch = useDispatch()
    const { data } = useSelector((state) => state.user);
    const [productData, setProductData] = useState({})
    const [paymentMethod, setPayment] = useState("")
    const history = useHistory()
    const setupPayment = () => {
        if (paymentMethod === "") { swal("Payment?", "Pilih metode pembayarannya dulu dong ~", "warning") }
        else {
            const _idTransaksi = localStorage.getItem("_IdTransaction")
            const listPayment = JSON.parse(localStorage.getItem("_listOrder")).map(item => {
                return {
                    productId: item.id_product,
                    transactionId: _idTransaksi,
                    sizeProduct: item.sizeProduct
                }
            })
            axios.get(process.env.REACT_APP_SERVER + "/v1/trx/done/" + localStorage.getItem("transactionId"), { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then((res) => { console.log(res.data.data) })
                .catch((err) => { console.log(err.response) })
            axios.post(process.env.REACT_APP_SERVER + "/v1/order", listPayment, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then((res) => {
                    dispatch({ type: "RESET_CART" })
                    localStorage.removeItem("_IdTransaction")
                    localStorage.removeItem("_products")
                    localStorage.removeItem("_total")
                    swal("Berhasil!", "Pesanan selesai, makanan kamu akan segera di proses ~", "success").then(() => { history.push("/user/History") })
                })
                .catch((err) => { console.log(err.response) })
        }
    }
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER + "/v1/product/" + localStorage.getItem("productId"))
            .then((res) => { setProductData(res.data.data) })
            .catch((err) => { console.log(err.response) })
    }, [])
    if (localStorage.getItem("token") === null) { swal("Belum login?", "Login dulu, yuk?", "warning").then(() => { history.push("/user/Login") }) }
    const formatRibuan = (uang) => {
        const sisa = uang.toString().length % 3
        let rupiah = uang.toString().substr(0, sisa)
        const ribuan = uang.toString().substr(sisa).match(/\d{3}/g);
        if (ribuan) {
            const separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
        return rupiah
    }
    if (transaction !== null) {
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
                                        <h3 className='font-weight-bold m-0 text-coklat'>Order Summary</h3>
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
                                            value={"IDR " + formatRibuan(localStorage.getItem("_total"))}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-5 ml-auto ">
                                <div className="row">
                                    <div className="col-12 my-5 my-lg-0">
                                        <div className="d-flex justify-content-between">
                                            <h3 className='fw-700 text-white mb-2'>Address details</h3>
                                            <Link to="/user/Profil" className='fw-700 text-decoration-none mb-0'>Edit</Link>
                                        </div>
                                        <div className='bg-white rounded-md px-4 py-4'>
                                            <div className='border-bottom'>
                                                <p><strong>Delivery</strong> to {data.displayName}</p>
                                            </div>
                                            <div className='border-bottom my-3'>
                                                <p>{data.address}</p>
                                            </div>
                                            <div className='my-3'>
                                                <p>{data.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 my-5">
                                        <div className="d-flex">
                                            <h3 className='fw-700 text-white mb-3'>Payment Method</h3>
                                        </div>
                                        <div className='bg-white rounded-md px-4 py-4'>
                                            <div className='displayRow' style={{alignItems: "center", justifyContent: "space-between"}}>
                                                <img 
                                                    className="hoverThis hideThisInDesktop"
                                                    onClick={ () => { setPayment("BCA") } } 
                                                    src="https://user-images.githubusercontent.com/77045083/113516429-7977c680-95a4-11eb-922a-5d85393d2958.png"
                                                    style={
                                                        paymentMethod === "BCA" ?
                                                        {border: "0.1vw solid black", borderRadius: "1.5vw", height: "7vw", opacity: "0.5", width: "20vw"}
                                                        :
                                                        {border: "0.1vw solid black", borderRadius: "1.5vw", height: "7vw", width: "20vw"}
                                                    }
                                                />
                                                <img 
                                                    className="hoverThis hideThisInMobile"
                                                    onClick={ () => { setPayment("BCA") } } 
                                                    src="https://user-images.githubusercontent.com/77045083/113516429-7977c680-95a4-11eb-922a-5d85393d2958.png"
                                                    style={
                                                        paymentMethod === "BCA" ?
                                                        {border: "0.1vw solid black", borderRadius: "0.5vw", height: "2vw", opacity: "0.5", width: "6vw"}
                                                        :
                                                        {border: "0.1vw solid black", borderRadius: "0.5vw", height: "2vw", width: "6vw"}
                                                    }
                                                />
                                                <img 
                                                    className="hoverThis hideThisInDesktop"
                                                    onClick={ () => { setPayment("Dana") } } 
                                                    src="https://user-images.githubusercontent.com/77045083/113516431-7b418a00-95a4-11eb-9566-1c295678d300.png"
                                                    style={
                                                        paymentMethod === "Dana" ?
                                                        {border: "0.1vw solid black", borderRadius: "1.5vw", height: "7vw", opacity: "0.5", width: "20vw"}
                                                        :
                                                        {border: "0.1vw solid black", borderRadius: "1.5vw", height: "7vw", width: "20vw"}
                                                    }
                                                />
                                                <img 
                                                    className="hoverThis hideThisInMobile"
                                                    onClick={ () => { setPayment("Dana") } } 
                                                    src="https://user-images.githubusercontent.com/77045083/113516431-7b418a00-95a4-11eb-9566-1c295678d300.png"
                                                    style={
                                                        paymentMethod === "Dana" ?
                                                        {border: "0.1vw solid black", borderRadius: "0.5vw", height: "2vw", opacity: "0.5", width: "6vw"}
                                                        :
                                                        {border: "0.1vw solid black", borderRadius: "0.5vw", height: "2vw", width: "6vw"}
                                                    }
                                                />
                                                <img 
                                                    className="hoverThis hideThisInDesktop"
                                                    onClick={ () => { setPayment("OVO") } } 
                                                    src="https://user-images.githubusercontent.com/77045083/113516436-7d0b4d80-95a4-11eb-8bbe-d9430506398c.png"
                                                    style={
                                                        paymentMethod === "OVO" ?
                                                        {border: "0.1vw solid black", borderRadius: "1.5vw", height: "7vw", opacity: "0.5", width: "20vw"}
                                                        :
                                                        {border: "0.1vw solid black", borderRadius: "1.5vw", height: "7vw", width: "20vw"}
                                                    }
                                                />
                                                <img 
                                                    className="hoverThis hideThisInMobile"
                                                    onClick={ () => { setPayment("OVO") } } 
                                                    src="https://user-images.githubusercontent.com/77045083/113516436-7d0b4d80-95a4-11eb-8bbe-d9430506398c.png"
                                                    style={
                                                        paymentMethod === "OVO" ?
                                                        {border: "0.1vw solid black", borderRadius: "0.5vw", height: "2vw", opacity: "0.5", width: "6vw"}
                                                        :
                                                        {border: "0.1vw solid black", borderRadius: "0.5vw", height: "2vw", width: "6vw"}
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 my-5">
                                        <BtnLg
                                            value='Confirm and Pay'
                                            color='btn-coklat'
                                            rounded='rounded-lg'
                                            onClick={() => { setupPayment() }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    } else {
        return <>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <div className="rounded-sm shadow p-3 w-100 mb-3">
                            <div className="text-center rounded-md mb-3" style={{ border: "3px dashed gray" }}>
                                <h3 className="my-5 text-gray">Keranjang kosong :(</h3>
                            </div>
                            <div className="w-100 text-right">
                                <Link style={{ textDecoration: "none" }} to="/Products?page=1&limit=8">Yuk cari makanan</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    }
}

export default Payment
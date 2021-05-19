import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/organisme'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import axios from "axios"
import swal from "sweetalert"
export default function Chart() {
    const transaksi = localStorage.getItem("_IdTransaction")
    const history = useHistory()
    const dispatch = useDispatch()
    const { products, total } = useSelector(state => state.chart)
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
    const createTransaction = () => {
        if(transaksi === null){
            const data = {
                totalPayment: total,
                paymentMethod: "bank",
                statusOrder: "Process",
                deliveryMethod: "Home Delivery"
            }
            axios.post(process.env.REACT_APP_SERVER + "/v1/trx", data, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
                .then((res) => {
                    localStorage.setItem("_listOrder", JSON.stringify(products))
                    localStorage.setItem("_IdTransaction", res.data.data.id)
                    swal("Success", "Berhasil membuat transaksi baru, silahkan lanjut ke pembayaran!", "success").then(() => { history.push("/user/Payment") })
                })
                .catch((err) => { console.log(err.response) })
        }else{
            history.push("user/payment")
        }
    }
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row mt-5">
                    <div className={products.length !== 0 ? "hide" : "col-12 col-lg-8"}>
                        <div className="rounded-sm shadow p-3 w-100 mb-3">
                            <div className="text-center rounded-md mb-3" style={{ border: "3px dashed gray" }}>
                                <h3 className="my-5 text-gray">Keranjang kosong :(</h3>
                            </div>
                            <div className="w-100 text-right">
                                <Link style={{ textDecoration: "none" }} to="/Products?page=1&limit=8">Yuk cari makanan</Link>
                            </div>
                        </div>
                    </div>
                    <div className={products.length === 0 ? "hide" : "col-12 col-lg-8"}>
                        {products.map(item => {
                            const rupiah = formatRibuan(item.subTotal)
                            return <div className="rounded-sm shadow p-3 w-100 mb-3 position-relative">
                                <div className="d-flex">
                                    <div className="align-self-center mr-4">
                                        <div className="rounded d-flex justify-content-center overflow-hidden" style={{ width: "120px", height: "120px" }}>
                                            <img src={item.image} className="w-100 align-self-center" />
                                        </div>
                                    </div>
                                    <div className="align-self-center">
                                        <h4>{item.name}</h4>
                                        <div className="d-flex">
                                            <div className="mr-4">
                                                <label className="mb-1 font-weight-bold" style={{ fontSize: "14px" }}>Delivery Method</label>
                                                <div className="px-3 rounded py-1 text-white text-center" style={{ background: "#6A4029", fontSize: "12px" }}>{item.deliveryMethod}</div>
                                            </div>
                                            <div>
                                                <div>
                                                    <label className="mb-1 font-weight-bold" style={{ fontSize: "14px" }}>Size : <span style={{ color: "#6A4029" }}>{item.sizeProduct}</span></label>
                                                </div>
                                                <div>
                                                    <label className="mb-1 font-weight-bold" style={{ fontSize: "14px" }}>Amount : <span style={{ color: "#6A4029" }}>{item.howMuchProduct}</span></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="align-self-center ml-auto">
                                        <h5>Rp{rupiah}</h5>
                                    </div>
                                    {/* tombol remove */}
                                    <div className={transaksi === null ? "" : "hide" }>
                                        <div className="p-1 rounded-pill c-pointer text-white material-icons" style={{ position: "absolute", top: "20px", right: "20px", background: "black", fontSize: "16px" }}
                                            onClick={() => {
                                                const index = products.indexOf(item);
                                                if (index > -1) {
                                                    products.splice(index, 1);
                                                    dispatch({ type: "SET_TO_CHART_PRODUCT", payload: products, total: total - item.subTotal })
                                                    localStorage.setItem("_products", JSON.stringify(products))
                                                    localStorage.setItem("_total", total - item.subTotal)
                                                }
                                            }}
                                        >close</div>
                                        {/*  */}
                                    </div>
                                    {/* belum bayar */}
                                    <div className={transaksi !== null ? "" : "hide" }>
                                        <div style={{ position: "absolute", top: "20px", right: "20px"}}>
                                            <div className="px-3 rounded py-1 text-white text-center" style={{ background: "#FFBA33", fontSize: "12px" }}>belum bayar</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="w-100 shadow rounded-sm p-3">
                            <h5 className="mb-4 text-center">Details</h5>
                            <div className="d-flex justify-content-between">
                                <p className="font-weight-bolder m-0">Total Price :</p>
                                <p className="font-weight-bolder m-0" style={{ color: "#6A4029" }}>Rp{formatRibuan(total)}</p>
                            </div>
                            <button className="text-white py-2 w-100 my-4 border-0 rounded-sm" disabled={products.length === 0 ? true : false } style={{ background: products.length === 0 ? "#dbdbdb" : "#FFBA33" }} onClick={createTransaction} >{transaksi !== null ? "Bayar Dulu ya" : "Checkout"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

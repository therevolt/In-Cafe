import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { CustomButton } from '../../components/atoms'
import Navbar from '../../components/organisme/Navbar'
import { useHistory, useLocation } from 'react-router-dom'
import { Footer } from '../../components/templates'

export default function ProductSearch() {
    const { keywords } = useSelector(state => state.key)
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    function useQuery() { return new URLSearchParams(useLocation().search) }
    const query = useQuery()
    const [userProfileRole, setProfileData] = useState("")
    const history = useHistory()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER}/v1/product?name=${keywords}`)
            .then(response => {
                setData(response.data.data)
                setError('')
            })
            .catch(err => {
                if (err.response.data.data == null) {
                    setError(err.response.data.message)
                }
            })
        console.log(data);
    }, [keywords])
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
    return (
        <div className="showInAnimation poppinsFont productsDesktop">
            <Helmet>
                <title>In Cafe - Our Products</title>
            </Helmet>
            <Navbar />
            <div className="container">
                <div className="row" style={{marginTop:"5rem", marginBottom:"5rem"}}>
                    {(error == "Product Not Found") ? <h2 className="text-danger text-center my-5 w-100">{error}</h2> : data.map(item => {
                        return <div className="col-6 col-md-4 col-lg-3 text-center mt-3">
                            <div className="w-100 shadow rounded-md hoverThis p-3" onClick={() => { history.push("/ProductDetails/" + item.id) }}>
                                <div className="d-flex justify-content-center rounded-circle overflow-hidden mx-auto mb-3" style={{width:"120px", height:"120px"}}>
                                    <img src={item.image} className="w-100 align-self-center" />
                                </div>
                                <div className="text-center">
                                    <p>{item.name}</p>
                                    <p style={{color: "#6A4029", fontWeight: "bold"}}>{"IDR " + formatRibuan(item.price)}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}
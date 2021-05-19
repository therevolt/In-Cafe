import TrashDeleteButton from '../../assets/delete.png'
import { YellowLogo } from '../atoms'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import Swal from 'sweetalert2'

export default function HistoryPage(){
   const history = useHistory()
   const [transactionData, setTransactionData] = useState([])
   const [refreshTrigger, switchRefreshTrigger] = useState(false)
   // format currency
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
   const deleteHistory = (e) => {
      axios.delete(process.env.REACT_APP_SERVER + "/v1/order/" + e.target.getAttribute("orderId"), { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
      swal("Berhasil!", "Berhasil hapus histori pemesanan ~", "success")
      .then(() => { switchRefreshTrigger(!refreshTrigger) })
   }
   useEffect(() => {
      if(localStorage.getItem("token") === null) { swal("Belum login?", "Login dulu, yuk?", "warning").then(() => { history.push("/user/Login") }) }
      else{
         axios.get(process.env.REACT_APP_SERVER + "/v1/order", { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
         .then((res) => { setTransactionData(res.data.data) })
         .catch((err) => { Swal.fire("Oops!", err.response.data.message, "error") })
      }
   }, [])
   useEffect(() => {
      if(localStorage.getItem("token") === null) { swal("Belum login?", "Login dulu, yuk?", "warning").then(() => { history.push("/user/Login") }) }
      else{
         axios.get(process.env.REACT_APP_SERVER + "/v1/order", { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
         .then((res) => { setTransactionData(res.data.data) })
         .catch((err) => { setTransactionData([]) })
      }
   }, [refreshTrigger])
   return(
      <div className="historyPage rubikFont" style={{color: "white", padding: "3vw 6vw", textAlign: "center"}}>
         <div className="letsSeeWhatYouBroughtText" style={{fontWeight: "bold"}}>Let's see what you've brought!</div>
         <div className="longPressToDeleteText">Long press to delete them</div>
         <div className="row" style={{marginTop: "5vw"}}>
            {
            transactionData.length === 0 ?
            <div className="displayRow ifHistoryIsNotFound">Histori transaksi tidak di temukan!</div>
            :
            transactionData.map((item) => 
               <div className="col-12 col-lg-4">
                  <div className="hoverThis historyCard">
                     <div className="displayRow" style={{alignItems: "center"}}>
                        <img className="historyProductImage" src={item.image} style={{borderRadius: "50%"}}/>
                        <div className="displayColumn poppinsFont" style={{textAlign: "left", width: "100%"}}>
                           <div className="historyProductName" style={{fontWeight: "bold"}}>{item.name}</div>
                           <div className="displayColumn historyProductInfo" style={{color: "#6A4029"}}>
                              <div className="displayRow" style={{justifyContent: "space-between", width: "100%"}}>
                                 {"IDR " + formatRibuan(item.totalPayment)}
                                 <div className="historyHoverButtonShow">
                                    <div className="displayRow historyFloatBtnGroup" style={{justifyContent: "space-between"}}>
                                       <img className="hoverThis historyProductDeleteBtn" src={TrashDeleteButton} orderId={item.id} style={{borderRadius: "50%"}} onClick={(e) => { deleteHistory(e) }}/>
                                       <div className="hoverThis historyProductCloseBtn" style={{fontWeight: "bold"}}><YellowLogo imgHeight="0.5vw" value="x"/></div>
                                    </div>
                                 </div>
                              </div>
                              <div>{item.status}</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}
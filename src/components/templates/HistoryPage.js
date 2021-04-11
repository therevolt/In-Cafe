import TrashDeleteButton from '../../assets/delete.png'
import { YellowLogo } from '../atoms'
import { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

export default function HistoryPage(){
   const [transactionData, setTransactionData] = useState([])
   const deleteHistory = (e) => {
      console.log("satu")
      axios.delete(process.env.REACT_APP_SERVER + "/v1/order/" + e.target.getAttribute("orderId"), { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
      .then((res) => { 
         console.log("dua")
         // swal("Success", "Berhasil hapus order yang di pilih!", "success").then(() => {window.location = "/user/History"}) 
      })
      .catch((err) => { 
         console.log("tiga")
         // swal("Gagal", "Penghapusan history order gagal!", "error")
       })
   }
   useEffect(() => {
      axios.get(process.env.REACT_APP_SERVER + "/v1/order", { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
      .then((res) => { setTransactionData(res.data.data) })
      .catch((err) => { console.log(err.response) })
   }, [])
   return(
      <div className="historyPage rubikFont" style={{color: "white", padding: "3vw 6vw", textAlign: "center"}}>
         <div style={{fontSize: "3vw", fontWeight: "bold"}}>Let's see what you've brought!</div>
         <div style={{fontSize: "1.5vw"}}>Long press to delete them</div>
         <div className="row" style={{marginTop: "5vw"}}>
            {transactionData.map((item) => 
               <div className="col-4">
                  <div className="hoverThis historyCard">
                     <div className="displayRow" style={{alignItems: "center"}}>
                        <img src={item.image} style={{borderRadius: "50%", height: "5vw", margin: "0 1vw", width: "5vw"}}/>
                        <div className="displayColumn poppinsFont" style={{textAlign: "left", width: "100%"}}>
                           <div style={{fontSize: "1.5vw", fontWeight: "bold"}}>{item.name}</div>
                           <div className="displayColumn" style={{color: "#6A4029", fontSize: "1.1vw"}}>
                              <div className="displayRow" style={{justifyContent: "space-between", width: "100%"}}>
                                 {"IDR " + item.price}
                                 <div className="historyHoverButtonShow">
                                    <div className="displayRow" style={{justifyContent: "space-between", marginTop: "-5vw", marginRight: "-2.5vw", width: "7vw"}}>
                                       <img className="hoverThis" src={TrashDeleteButton} orderId={item.id} style={{borderRadius: "50%", height: "3.3vw", width: "3.3vw"}} onClick={(e) => { deleteHistory(e) }}/>
                                       <div className="hoverThis" style={{fontSize: "2vw", fontWeight: "bold"}}><YellowLogo imgHeight="0.5vw" value="x"/></div>
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
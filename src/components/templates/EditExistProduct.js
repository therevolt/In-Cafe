import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function EditExistProduct() {
   const history = useHistory()
   useEffect(() => {
      axios.get(process.env.REACT_APP_SERVER + "/v1/users", { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
      .then((res) => { res.data.data.role === "admin" ? null : history.push("/Home") })
      .catch((err) => { console.log(err.response) })
      }, [])
   return(
      <div className="displayRow showInAnimation" style={{padding: "3vw 6vw"}}>
         <div className="editProductLeft">
            
         </div>
         <div className="editProductRight">
         
         </div>
      </div>
   )
}
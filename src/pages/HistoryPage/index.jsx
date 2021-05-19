import './style.css'
import { Helmet } from 'react-helmet'
import Navbar from '../../components/organisme/Navbar'
import Footer from '../../components/templates/Footer'
import { HistoryPage } from '../../components/templates'

export default function AddProduct(){
   return(
      <div className="showInAnimation">
         <Helmet>
            <title>In Cafe - History Page</title>
         </Helmet>
         <Navbar/>
         <HistoryPage/>
         <Footer/>
      </div>
   )
}
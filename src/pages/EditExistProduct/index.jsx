import './style.css'
import { Helmet } from 'react-helmet'
import Navbar from '../../components/organisme/Navbar'
import Footer from '../../components/templates/Footer'
import { EditExistProduct } from '../../components/templates'

export default function EditProduct() {
   return(
      <div className="showInAnimation editProductDesktop">
         <Helmet>
            <title>In Cafe - Edit Existing Product</title>
         </Helmet>
         <Navbar/>
         <EditExistProduct/>
         <Footer/>
      </div>
   )
}
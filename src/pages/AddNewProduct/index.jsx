import './style.css'
import { Helmet } from 'react-helmet'
import Navbar from '../../components/organisme/Navbar'
import Footer from '../../components/templates/Footer'
import { AddNewProduct } from '../../components/templates'

export default function AddProduct(){
   return(
      <div className="showInAnimation addProductDesktop">
         <Helmet>
            <title>In Cafe - Add New Product</title>
         </Helmet>
         <Navbar/>
         <AddNewProduct/>
         <Footer/>
      </div>
   )
}
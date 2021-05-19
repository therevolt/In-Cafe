import './style.css'
import { Helmet } from 'react-helmet'
import Navbar from '../../components/organisme/Navbar'
import Footer from '../../components/templates/Footer'
import { ProductDetails } from '../../components/templates'

export default function ProductsDetails(){
   return(
      <div className="showInAnimation productDetailsDesktop">
         <Helmet>
            <title>In Cafe - Product Details</title>
         </Helmet>
         <Navbar/>
         <ProductDetails/>
         <Footer/>
      </div>
   )
}
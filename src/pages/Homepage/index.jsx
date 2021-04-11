import './style.css'
import { Helmet } from 'react-helmet'
import Navbar from '../../components/organisme/Navbar'
import Footer from '../../components/templates/Footer'
import { Homepage } from '../../components/templates'

export default function HomePage(){
   return(
      <div className="showInAnimation homepageDesktop">
         <Helmet>
            <title>In Cafe - Home</title>
         </Helmet>
         <Navbar/>
         <Homepage/>
         <Footer/>
      </div>
   )
}
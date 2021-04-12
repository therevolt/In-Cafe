import OurSponsor from '../../../assets/Sponsored.png'

export default function OurPartner() {
   return(
      <div className="displayColumn ourPartner rubikFont">
         <div className="homeBigText" style={{textAlign: "center"}}>Our Partner</div>
         <img src={OurSponsor}/>
      </div>
   )
}
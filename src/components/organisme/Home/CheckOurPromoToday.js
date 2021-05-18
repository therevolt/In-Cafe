import { CustomButton } from '../../atoms'

export default function CheckOurPromoToday() {
   return(
      <div className="checkOurPromoToday rubikFont">
         <div className="displayRow insideCheckOurPromoToday">
            <div className="displayColumn ourPromoLeft">
               <div className="homeMediumText" style={{fontWeight: "bold"}}>Check our promo today!</div>
               <div className="homeSmallText">Let's see the deals and pick yours!</div>
            </div>
            <div className="homeSmallText ourPromoRight">
               <CustomButton bgClr="#FFBA33" brRad="1vw" btnPdg="1vw 5vw" ftWg="bold" txClr="#6A4029" value="See Promo"/>
            </div>
         </div>
      </div>
   )
}
import { CustomButton } from '../../atoms'

export default function CheckOurPromoToday() {
   return(
      <div className="checkOurPromoToday rubikFont">
         <div className="displayRow insideCheckOurPromoToday">
            <div className="displayColumn ourPromoLeft">
               <div style={{fontSize: "2.5vw", fontWeight: "bold"}}>Check our promo today!</div>
               <div style={{fontSize: "1vw"}}>Let's see the deals and pick yours!</div>
            </div>
            <div className="ourPromoRight">
               <CustomButton bgClr="#FFBA33" brRad="1vw" btnPdg="1vw 5vw" ftSize="1.1vw" ftWg="bold" txClr="#6A4029" value="See Promo"/>
            </div>
         </div>
      </div>
   )
}
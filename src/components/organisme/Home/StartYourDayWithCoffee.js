import { BtnLg } from '../../atoms'

export default function StartYourDayWithCoffee(){
   return(
      <div className="rubikFont startYourDayWithCoffee">
         <div className="displayRow" style={{justifyContent: "space-between"}}>
            <div className="displayColumn withCoffeeLeftSide">
               <span className="noMargin startYourDayText">Start your day with</span>
               <span className="startYourDayText">Coffee and Good Meals</span>
               <div className="weProvideHighQualityBeans">
                  <div className="noMargin">We provide high quality beans, good taste, and healthy</div>
                  <div className="noMargin">meals made by love just for you. Start your day with us</div>
                  <div>for a bigger smile!</div>
               </div>
               <div style={{width: "45%"}}><BtnLg value="Get Started" color="btn-orange"/></div>
            </div>
            <div className="withCoffeeRightSide">
               <form className="displayRow homeSearchBar">
                  <img src="https://user-images.githubusercontent.com/77045083/113756261-621f1180-973b-11eb-94b0-e6ee1be8b9e4.png" style={{height: "1.1vw", margin: "0 1vw"}}/>
                  <input className="homeSearchInput poppinsFont" placeholder="Search" required/>
               </form>
            </div>
         </div>
      </div>
   )
}
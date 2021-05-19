import { BtnLg } from '../../atoms'

export default function StartYourDayWithCoffee(){
   return(
      <div className="rubikFont startYourDayWithCoffee">
         <div className="displayRow" style={{justifyContent: "space-between"}}>
            <div className="displayColumn withCoffeeLeftSide">
               <span className="noMargin startYourDayText">Start your day with</span>
               <span className="startYourDayText">Coffee and Good Meals</span>
               <div className="weProvideHighQualityBeans">
                  <div className="noMargin">We provide high quality beans, good taste, and healthy meals made by love just for you. Start your day with us for a bigger smile!</div>
               </div>
               <div className="getStartedButton"><BtnLg value="Get Started" color="btn-orange"/></div>
            </div>
         </div>
      </div>
   )
}
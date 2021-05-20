import { WorldMap } from '../../molekuls'

export default function VisitOurStoreOnTheMapBelow(){
   return(
      <div className="displayColumn visitOurStore">
         <div className="visitOurStoreText" style={{textAlign: "center"}}>
            <div className="homeBigText" style={{margin: "5vw 0 3vw 0"}}>
               <div>Visit Our Store in the</div>
               <div>Spot on the Map Below</div>
            </div>
            <div className="homeMediumText">
               <div>See our store in every city on the spot and spend your good day here.</div>
               <div>See you soon!</div>
            </div>
         </div>
         <WorldMap/>
      </div>
   )
}
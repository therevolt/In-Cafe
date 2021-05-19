import Map from '../../assets/map.png'
import { MapBtn } from '../atoms'

export default function WorldMap(){
   // MAP BUTTON - COORDINATE CONFIG
   const mapButtonCoordinate = [
      {mL: "8.3vw", mT:"13vw", size:"2vw"},
      {mL: "14vw", mT:"12vw", size:"3vw"},
      {mL: "20vw", mT:"12.5vw", size:"3vw"},
      {mL: "17vw", mT:"16vw", size:"4vw"},
      {mL: "25.5vw", mT:"15.5vw", size:"3vw"},
      {mL: "19.3vw", mT:"23vw", size:"2vw"},
      {mL: "23vw", mT:"21vw", size:"2vw"},
      {mL: "25vw", mT:"6vw", size:"2vw"},
      {mL: "31vw", mT:"8vw", size:"3vw"},
      {mL: "36vw", mT:"7vw", size:"2vw"},
      {mL: "31vw", mT:"13vw", size:"2vw"},
      {mL: "25.5vw", mT:"29vw", size:"3vw"},
      {mL: "32vw", mT:"32vw", size:"2vw"},
      {mL: "28vw", mT:"32.5vw", size:"4vw"},
      {mL: "26.5vw", mT:"37vw", size:"3vw"},
      {mL: "39.5vw", mT:"25vw", size:"3vw"},
      {mL: "45vw", mT:"32.5vw", size:"4vw"},
      {mL: "46vw", mT:"26vw", size:"4vw"},
      {mL: "45.5vw", mT:"18vw", size:"3vw"},
      {mL: "43vw", mT:"14vw", size:"2vw"},
      {mL: "52vw", mT:"15vw", size:"3vw"},
      {mL: "58vw", mT:"11vw", size:"2vw"},
      {mL: "57vw", mT:"24vw", size:"3vw"},
      {mL: "60vw", mT:"16vw", size:"4vw"},
      {mL: "63vw", mT:"21vw", size:"2vw"},
      {mL: "66vw", mT:"13vw", size:"2vw"},
      {mL: "76vw", mT:"12vw", size:"3vw"},
      {mL: "64vw", mT:"31vw", size:"2vw", capitalCity: "Jakarta", countryName: "Indonesia", countryUrl: "https://image.freepik.com/free-vector/monas-jakarta-tourism-holiday-travel-indonesia_87190-33.jpg"}, 
      {mL: "65.5vw", mT:"35.5vw", size:"4vw"},
      {mL: "71.5vw", mT:"37.5vw", size:"2vw"},
   ]
   return(
      <div>
         {/* LOOPING - MAP BUTTON */}
         {mapButtonCoordinate.map((item) => 
         <MapBtn 
            capitalCity={ typeof item.capitalCity === "string" ? item.capitalCity : "Capital" }
            countryName={ typeof item.countryName === "string" ? item.countryName : "Country" }
            countryUrl={ typeof item.countryUrl === "string" ? item.countryUrl : "https://www.pngitem.com/pimgs/m/208-2087944_question-mark-logo-whatsapp-png-transparent-png.png" }
            mL={item.mL} 
            mT={item.mT} 
            size={item.size}/>
         )}
         <img src={Map} style={{padding: "6vw", position: "relative", width: "88vw", zIndex: "-1"}}/>
      </div>
   )
}
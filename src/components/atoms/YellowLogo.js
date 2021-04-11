export default function YellowLogo({img, imgHeight, imgWidth, value}){
   return(
      <div className="displayRow" style={{alignItems: "center", background: "#FFBA33", borderRadius: "50%", height: "3.3vw", justifyContent: "center", width: "3.3vw"}}>
         {img !== undefined ?
         <img src={img} style={{height: imgHeight, width: imgWidth}}/>
         :
         value
         }
      </div>
   )
}
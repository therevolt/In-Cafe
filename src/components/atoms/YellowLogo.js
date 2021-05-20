export default function YellowLogo({cls, img, imgHeight, imgWidth, value}){
   return(
      <div className={"displayRow yellowLogoRadiusClass"}>
         {img !== undefined ?
         <img className={cls} src={img} style={{height: imgHeight, width: imgWidth}}/>
         :
         cls !== undefined && img !== undefined ?
         <img className={cls} src={img}/>
         :
         value
         }
      </div>
   )
}
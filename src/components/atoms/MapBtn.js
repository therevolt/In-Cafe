import MapButton from '../../assets/mapbtn.png'

export default function MapBtn({capitalCity, countryName, countryUrl, mT, mB, mL, mR, size, url}){
   return(
      <div className="dropdown" style={{marginTop: mT, marginBottom: mB, marginLeft: mL, marginRight: mR, position: "absolute", height: size, width: size}}>
         <img className="dropdown-toggle hoverThis" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" src={MapButton} style={{height: size, width: size}}/>
         <div className="dropdown-menu dropdownMenuCenter mapBtnDropdownConf" aria-labelledby="dropdownMenuButton" style={{padding: "1vw 2vw"}}>
            <div className="displayRow justifyContentCenter">
               <img className="userProfileImage" src={countryUrl}/>
               <div className="displayColumn userProfileNameAndTitle">
                  <p className="mulishFont userProfileName">{capitalCity}</p>
                  <p className="mulishFont userProfileTitle">{countryName}</p>
               </div>
            </div>
         </div>
      </div>
   )
}
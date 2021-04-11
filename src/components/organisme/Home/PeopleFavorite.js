import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function PeopleFavorite(){
   const [selectFavoriteFood, favoriteFood] = useState("")
   const [foodData, setFoodData] = useState([])
   const history = useHistory()
   useEffect(() => {
      axios.get(process.env.REACT_APP_SERVER + "/v1/product")
      .then((res) => { setFoodData(res.data.data) })
      .catch((err) => { console.log(err.response) })
   }, [])
   console.log(foodData)
   return(
      <div className="displayColumn peopleFavorite rubikFont">
         <div style={{textAlign: "center"}}>
            <p className="homeBigText">Here is People's Favorite</p>
            <p className="homeMediumText">Let's choose and have a bit taste of people's favorite. It might be yours too!</p>
         </div>
         <div className="displayRow peopleFavoriteMenuList">
            {foodData.slice(0,3).map((item) => 
               <div className="displayColumn peopleFavoriteFoodCard" style={selectFavoriteFood === item.name ? {border: "0.2vw solid #6A4029"} : null}>
                  <div className="displayColumn" style={{textAlign: "center"}}>
                     <img className="favoriteFoodImage" src={item.image}/>
                     <div style={{padding: "3vw 0"}}>
                        <p className="homeMediumText" style={{fontWeight: "bold", marginBottom: "2vw"}}>{item.name}</p>
                        <div className="displayRow homeSmallText peopleFavoriteCategory">
                           <img src="https://user-images.githubusercontent.com/77045083/113905664-95c27000-97fd-11eb-9711-62c1c0298107.png" style={{height: "1vw", marginRight: "2.2vw"}}/>
                           (keterangan 1)
                        </div>
                        <div className="displayRow homeSmallText peopleFavoriteCategory">
                           <img src="https://user-images.githubusercontent.com/77045083/113905664-95c27000-97fd-11eb-9711-62c1c0298107.png" style={{height: "1vw", marginRight: "2.2vw"}}/>
                           (keterangan 2)
                        </div>
                        <div className="displayRow homeSmallText peopleFavoriteCategory">
                           <img src="https://user-images.githubusercontent.com/77045083/113905664-95c27000-97fd-11eb-9711-62c1c0298107.png" style={{height: "1vw", marginRight: "2.2vw"}}/>
                           (keterangan 3)
                        </div>
                        <div className="displayRow homeSmallText peopleFavoriteCategory">
                           <img src="https://user-images.githubusercontent.com/77045083/113905664-95c27000-97fd-11eb-9711-62c1c0298107.png" style={{height: "1vw", marginRight: "2.2vw"}}/>
                           (keterangan 4)
                        </div>
                     </div>
                  </div>
                  <div className="displayColumn favoriteMenuSelection">
                     <span className="favoriteFoodPrice">{"IDR " + item.price}</span>
                     <button className="hoverThis selectFavoriteFoodButton" onClick={(e) => {favoriteFood(item.name); history.push("/ProductDetails/" + item.id)}} style={selectFavoriteFood === item.name ? {background: "#FFBA33"} : null }>Select</button>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}
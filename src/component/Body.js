import { useState,useEffect,useContext } from "react";
import { restaurantList } from "../../config";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import UserContext from "../utils/userContext";

const filterData = (searchText,restaurantList)=>{
    const filterList = restaurantList.filter(list=>list?.info?.name?.toLowerCase().includes(searchText.toLowerCase()))
    return filterList
}
const Body=()=>{
    const [restaurantData,setRestaurantData] = useState([]);
    const [filterRestaurantData,setFilterRestaurantData] = useState([])
    const [searchText,setSearchText]=useState("");
    const {user,setUser} = useContext(UserContext);

    useEffect(()=>{
        getRestaurant();        
    },[]);
    
    const getRestaurant = async() =>{
        try {
            const response  = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.0224734&lng=72.5715931&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
            const json = await response.json();
            
            const getJsonData = async(jsonData)=>{
                for(let i=0;i<jsonData?.data?.cards.length;i++){
                    let data = jsonData?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                    if(data!==undefined){
                        return data;
                    }
                }
            }
            const resData = await getJsonData(json);
            setRestaurantData(resData);
            setFilterRestaurantData(resData);
        } catch (error) {
            console.log(error);
        }
        
    }
    if(!restaurantData) return null;
    return (
        <>  
            <div className="search-container">
                <input placeholder="search" type="text" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
                <button onClick={()=>{
                    const data = filterData(searchText,restaurantData)
                    setFilterRestaurantData(data)
                }}>Search</button>
                <input name="name" value={user.name} placeholder="Testing useContext"
                    onChange={(e)=>setUser(
                        {...user,[e.target.name]:e.target.value})} />
            </div>
            <div className="restaurant-list">
                {
                    restaurantData.length===0?(
                        <Shimmer/>
                    ):
                    (
                        filterRestaurantData.map((restaurant)=>{
                        return(
                            <Link to={`/restaurantmenu/` + restaurant.info.id} key={restaurant.info.id}>
                                <RestaurantCard  data={restaurant.info}/>
                            </Link>
                            )
                        })
                    )
                }
            </div>
        </>
    )
}
export default Body;
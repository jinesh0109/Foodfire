import { IMG_CDN_URL } from "../../config";
import { useContext } from "react";
import UserContext from "../utils/userContext";

const RestaurantCard = (props) =>{
    const {cloudinaryImageId,name,cuisines,area,avgRating,lastMileTravelString} = props.data
    const {user} = useContext(UserContext);
    
    return(
        <>
            <div className="card">
                <img alt="card" src={IMG_CDN_URL + cloudinaryImageId}/>
                <div className="card-items">
                    <h2>{name}</h2>
                    <h4>{cuisines.join(', ')}</h4>
                    <h6>{area}</h6>
                    <span>
                        <h4>
                            Rating: {avgRating}
                        </h4>
                        <h4>{lastMileTravelString}</h4>
                    </span>
                    <div>{user.name} - {user.email} </div>
                </div>
            </div>
        </>
    )
}
export default RestaurantCard;
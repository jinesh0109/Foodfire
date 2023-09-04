import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL, RESTAURANT_TYPE_KEY, MENU_ITEM_TYPE_KEY } from "../../config";
import { useDispatch } from "react-redux";
import { addItems } from "./CartSlice";

const RestaurantMenu = ()=>{
    const {id} = useParams();
    const [restaurantMenuData,setRestaurantMenuData] = useState(null);
    const [menuItems,setMenuItems] = useState([]);

    const dispatch = useDispatch();

    useEffect(()=>{
        getRestaurantMenu();
    },[])

    const getRestaurantMenu = async()=>{
        try {
            const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.0224734&lng=72.5715931&restaurantId=`+id+`&catalog_qa=undefined&submitAction=ENTER`);
            const jsonData = await data.json();
            
            const restaurants = jsonData?.data?.cards?.map(x => x.card)?.
                                find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;
            setRestaurantMenuData(restaurants)

            const menuItemsData = jsonData?.data?.cards.find(x=> x.groupedCard)?.
                            groupedCard?.cardGroupMap?.REGULAR?.
                            cards?.map(x => x.card?.card)?.
                            filter(x=> x['@type'] == MENU_ITEM_TYPE_KEY)?.
                            map(x=> x.itemCards).flat().map(x=> x.card?.info) || [];
            setMenuItems(menuItemsData);

        } catch (error) {
            setMenuItems([]);
            setRestaurantMenuData(null);
            console.log(error)
        }
    }
    const handleAddCart=(items)=>{
        dispatch(addItems(items))
    }
    return(
        <div className="menu-list-items">
            <div>
                <h1>{restaurantMenuData?.name}</h1>
                <img src={IMG_CDN_URL+restaurantMenuData?.cloudinaryImageId} alt="restaurant-img"/>
            </div>
            <div className="menuitems-card">
                {
                    menuItems.map((items)=>{
                        return(
                            <>
                                <div key={items.id} className="p-2 bg-slate-300">
                                    <h3>Item :  {items.name}</h3>
                                    <button onClick={()=>handleAddCart(items)} style={{backgroundColor:"lightGreen"}} className="m-2 p-2 cursor-pointer">Add Item</button>
                                    {items.price ? <h4>Price : {items.price}</h4>:<></>}
                                </div>
                            </>
                        )
                    })
                }
            </div>
        
        </div>
    )
}
export default RestaurantMenu;
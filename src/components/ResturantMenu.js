import { useLocation } from "react-router-dom";
import useResturantMenu from "../utils/useResturantMenu";
import Shimmer from "./Shimmer";



const ResturantMenu = () => {
    let location = useLocation();
    data = location.state.resData

    
    const menuItems = useResturantMenu(data)
    console.log("CHECKIGN RESTUARANT MENU")
    console.log(menuItems)
    
    return (     
        <div className="res-menu">
            <h1 className="text-center p-2 my-6 font-bold text-2xl">{data.name}</h1>
            <p className="text-center p-1 m-1 font-bold text-lg">{data.rating} stars</p>
            <h2>Menu</h2>
            <ul>
            {
                menuItems === null ? <Shimmer /> 
                : menuItems.map((item)=><li>{item.name} - Rs. {item.display_price || item.product_variations[0].price}</li>)
            }
            </ul>
        </div>
    )
}

export default ResturantMenu;
function getCuisines(resturantInfo) {
    cuisines = resturantInfo.characteristics.cuisines
    const cuisineNames = cuisines.map(cuisine => cuisine.name);
    const combinedNames = cuisineNames.join(', ');

    return combinedNames
}

const styleCard = {
    backgroundColor: "#f0f0f0"
}

const RestaurantCard = (props) => {
    resturantInfo = props.resInfo
    return (
        <div className="res-card m-4 p-4 w-[250px]" style={styleCard}>
            <img className="res-logo rounded-md" alt="res-logo" src={resturantInfo.hero_listing_image}/>
            <h3 className="font-bold py-4 text-lg">{resturantInfo.name}</h3>
            <h4>{getCuisines(resturantInfo)} </h4>
            <h4>{resturantInfo.rating} stars</h4>
            <h4>{resturantInfo.minimum_delivery_time} minutes</h4>
        </div>
    )
}

export const withPremiumLabel = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label className="bg-black text-white absolute m-2 p-2 rounded-md">
                    Premium
                </label>
                <RestaurantCard {...props}/>
            </div>  
        )
    }
};

export default RestaurantCard;
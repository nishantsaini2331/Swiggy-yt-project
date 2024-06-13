import React, { useContext, useEffect, useState } from "react";
import OnYourMind from "./onYourMind";
import TopRestaurant from "./TopRestaurant";
import OnlineFoodDelivey from "./OnlineFoodDelivey";
import { Coordinates } from "../context/contextApi";

function Body() {
    const [topRestaurantData, setTopRestaurantData]  = useState([])
    const [onYourMindData, setOnYourMindData]  = useState([])
    const {coord :{lat ,lng} } = useContext(Coordinates)

    async function fetchData() {
        const data = await fetch(
            `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
        );
        const result = await data.json();
        // console.log(result);
        // console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setTopRestaurantData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);  
        setOnYourMindData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
    }
    useEffect(() => {
        fetchData();
    }, [lat ,lng]);

    return (
        <div className="w-full ">
            <div className="w-[75%] mx-auto mt-3 overflow-hidden">
                <OnYourMind data={onYourMindData}/>
                <TopRestaurant data={topRestaurantData}/>
                <OnlineFoodDelivey data={topRestaurantData}/>
            </div>
        </div>
    );
}

export default Body;

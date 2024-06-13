import React from "react";
import RestaurantCard from "./RestaurantCard";

function OnlineFoodDelivey({ data }) {
    return (
        <div>
            Restaurants with online food delivery in Delhi
            
            <div className="grid grid-cols-4 gap-10">
            {data.map(({ info, cta : {link}}) => (
                    <div className="hover:scale-95 duration-300" key={info.id}>
                        <RestaurantCard {...info}  link={link} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OnlineFoodDelivey;

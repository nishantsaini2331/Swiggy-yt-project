import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Coordinates, Visibility } from "../context/contextApi";

function Head() {
    const navItems = [
        {
            name: "Swiggy corporate",
            image: "fi-rr-shopping-bag",
        },
        {
            name: "Search",
            image: "fi-rr-search",
        },
        {
            name: "Offers",
            image: "fi-rr-badge-percent",
        },
        {
            name: "Help",
            image: "fi-sr-life-ring",
        },
        {
            name: "Sign in",
            image: "fi-rr-user",
        },
        {
            name: "Cart",
            image: "fi-rr-shopping-cart-add",
        },
    ];

   const {visible , setVisible} = useContext(Visibility)

   const [searchResult , setSearchResult] = useState([])  
   const [address , setAddress] = useState("")  
   const {setCoord} = useContext(Coordinates) 
   

    function handleVisibility(){
        setVisible(prev => !prev)
    }

    async function searchResultFun(val){
        if(val == "") return
        const res = await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}`);
        const data = await res.json();
        setSearchResult(data.data)
    }

    async function fetchLatAndLng(id){
        if(id == "") return
        console.log(id);
        const res = await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`);
        const data = await res.json();
        setCoord({
            lat : data.data[0].geometry.location.lat,
            lng : data.data[0].geometry.location.lng
        })
        setAddress(data.data[0].formatted_address)
    }

    


    return (
        <div className="relative w-full">

                <div className="w-full">
                   <div onClick={handleVisibility} className={"w-full bg-black/50 z-30 h-full absolute " + (visible ? "visible " : " invisible")}></div>
                   <div className={" bg-white w-[40%] h-full p-5 z-40 absolute duration-500 " + (visible ? "left-0" : "-left-[100%]")}>
                      <p className=" bg-black text-white p-5 w-[10%]" onClick={handleVisibility}> cut</p>
                        <input type="text" className="border p-5 focus:outline-none focus:shadow-lg" onChange={(e) => searchResultFun(e.target.value)}/>
                        <div>
                            <ul>
                                {searchResult.map((data) => (
                                    <li onClick={() => fetchLatAndLng(data.place_id)}>
                                        {data.structured_formatting.main_text}  
                                        <p className="text-sm opacity-65">{data.structured_formatting.secondary_text}
                                        </p> 
                                    </li>
                                ))}
                            </ul>
                        </div>
                   </div>
                </div>
                   
                
            

            <div className="w-full sticky bg-white z-20 top-0 shadow-md h-24 flex justify-center items-center">
                <div className=" w-[70%] flex justify-between">

                    <div className="flex items-center">
                        <Link to={"/"}>
                            <img
                                className="w-24"
                                src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png"
                                alt=""
                            />
                        </Link>
                        <div className="flex items-center gap-2 " onClick={handleVisibility}>
                            <p >
                                <span className="font-bold border-b-2  border-black">others</span>  
                                <span className="ml-2 text-sm opacity-85">{address}</span>
                            </p>
                            <i className="fi text-2xl mt-2 text-orange-500 fi-rs-angle-small-down"></i>
                        </div>
                    </div>

                    <div className="flex items-center gap-14">
                        {navItems.map((data, i) => (
                            <div className="flex items-center gap-3" key={i}>
                                <i
                                    className={
                                        "mt-1 fi text-xl text-gray-700 " +
                                        data.image
                                    }
                                ></i>
                                <p className="text-lg font-medium text-gray-700">
                                    {data.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Outlet />
        </div>
    );
}

export default Head;

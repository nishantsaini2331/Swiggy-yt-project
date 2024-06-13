
import { Routes , Route} from "react-router-dom";
import Body from "./components/Body";
import Head from "./components/Head";
import RestaurantMenu from "./components/RestaurantMenu";
import { Coordinates, Visibility } from "./context/contextApi";
import { useState } from "react";

function App() {
    const [visible , setVisible] = useState(false);
    const [coord , setCoord] = useState({lat :28.5355161 , lng : 77.3910265})

    return (
        <Coordinates.Provider value={{coord ,setCoord}}>
            <Visibility.Provider value={{visible, setVisible}}>
                <div className={ visible ? "max-h-screen overflow-hidden" : " "}>
                    <Routes>
                        <Route path="/" element={<Head/>}>
                            <Route path="/" element={<Body/>}/>
                            <Route path="/restaurantMenu/:id" element={<RestaurantMenu/>}/>
                        </Route>
                        
                    </Routes>
                </div>
            </Visibility.Provider>
        </Coordinates.Provider>
    );
}

export default App;

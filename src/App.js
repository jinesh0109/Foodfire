import React,{lazy,Suspense,useContext, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./component/Header";
import Body from "./component/Body";
import Footer from "./component/Footer";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Error from "./component/Error";
// import About from "./component/About";
import Contact from "./component/Contact";
import RestaurantMenu from "./component/RestaurantMenu";
import Shimmer from "./component/Shimmer";
import InstaMart from "./component/InstaMart";
import UserContext from "./utils/userContext";

const About = lazy(()=>import("./component/About"));

const AppLayout = () =>{
    const [user,setUser]=useState({
            name:"Jinesh",
            email:"jbsalot01@gmail.com",
    })
    return(
        <UserContext.Provider value={{
            user:user,
            setUser:setUser
        }}>
            <Header/>
            <Outlet/>
            <Footer/>
        </UserContext.Provider>
    )
}

const router = createBrowserRouter([
    {
        path:"/",
        element: <AppLayout/>,
        errorElement:<Error/>,

        children:[
            {
                path:"/",
                element:<Body/>,                
            },
            {
                path:"/about",
                element:
                    <Suspense fallback={<Shimmer/>}>
                        <About/>
                    </Suspense>,                
            },
            {
                path:"/contact",
                element:<Contact/>,                
            },
            {
                path:"/restaurantmenu/:id",
                element: <RestaurantMenu/>,
            },
            {
                path:"/instamart",
                element:<InstaMart/>,
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
;import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error"
import ResturantMenu from "./components/ResturantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Shimmer from "./components/Shimmer";

const Contact = lazy(()=>import("./components/Contact"));

const AppLayout = () => {
    return ( 
    <div className="app">
        <Header />
        <Outlet />
    </div>)
}


const appRouter = createBrowserRouter([
    {    
        path: "/",
        element: <AppLayout />,
        errorElement : <Error />,
        children: [
            {
                path: "/",
                element: <Body /> 
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element:  <Suspense fallback={<Shimmer/>} ><Contact /></Suspense >
            },
            {
                path: "/restuarant/:resName",
                element: <ResturantMenu />
            }
        ]
    },
    
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />) 
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Brands from "../Pages/Brands";
import Category from "../Pages/Category";
import Models from "../Pages/Models";
import SingleCars from "../Pages/SingleCars";
export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <div>Bunaqa sahifa mavjud emas</div>,
        children:[
            {
                path:'/',
                element:<Category/>            
            },
            {
                path: '/login',
                element:<Login/>
            },
            {
                path:'/brands',
                element:<Brands/>
            },
            {
                path:'/models',
                element:<Models/>
            },
            {
                path:'/single/:id',
                element:<SingleCars/>
            }
        ]
    }
])
import { createBrowserRouter } from "react-router-dom";
import Authentications from "../Outlet/Authentications";
import Main from "../Outlet/Main";
import Login from "../Pages/Authentication/Login";
import Signup from "../Pages/Authentication/Signup";
import Blogs from "../Pages/Blogs/Blogs";
import Categories from "../Outlet/Categories";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import SingleCategoryAllAdds from "../Pages/Categories/SingleCategory/SingleCategoryAllAdds";
import Dashboard from "../Outlet/Dashboard";
import AllProducts from "../Pages/Dashboard/AllProducts";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/categories',
                element: <Categories />,
            },
            {
                path: '/about',
                element: <Blogs />,
            },
            {
                path: '/contactUs',
                element: <Blogs />,
            },
            {
                path: '/blogs',
                element: <Blogs />
            },


        ]
    },
    {
        path: '/authentications',
        element: <Authentications />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/authentications',
                element: <Login />
            },
            {
                path: '/authentications/login',
                element: <Login />
            },
            {
                path: '/authentications/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '/categories',
        element: <Categories />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/categories/',
                element: <SingleCategoryAllAdds />
            },
            {
                path: '/categories/:id',
                element: <SingleCategoryAllAdds />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard',
                element: <AllProducts />
            }
        ]
    }
])
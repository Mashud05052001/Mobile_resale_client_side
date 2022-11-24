import { createBrowserRouter } from "react-router-dom";
import Main from "../Outlet/Main";
import Login from "../Pages/Authentication/Login";
import Signup from "../Pages/Authentication/Signup";
import Blogs from "../Pages/Blogs/Blogs";
import Categories from "../Pages/Categories/Categories";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";

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
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/blogs',
                element: <Blogs />
            },


        ]
    }
])
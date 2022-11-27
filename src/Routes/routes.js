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
import AllSeller from "../Pages/Dashboard/Admin/AllSeller";
import AllBuyer from "../Pages/Dashboard/Admin/AllBuyer";
import ReportedItems from "../Pages/Dashboard/Admin/ReportedItems";
import MyOrders from "../Pages/Dashboard/Buyer/MyOrders";
import MyWishList from "../Pages/Dashboard/Buyer/MyWishList";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct";
import MyBuyers from "../Pages/Dashboard/Seller/MyBuyers";
import MyProducts from "../Pages/Dashboard/Seller/MyProducts";
import AllProducts from "../Pages/Categories/AllProducts/AllProducts";
import SingleProduct from "../Pages/Categories/SingleProduct/SingleProduct";


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
                path: '/categories',
                element: <AllProducts />
            },
            {
                path: '/categories/:id',
                element: <SingleCategoryAllAdds />,
            },
            {
                path: '/categories/singlePhone/:id',
                element: <SingleProduct />,
            },
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard',
                // element: <AllSeller />
                element: <MyProducts />
            },
            {
                path: '/dashboard/allSeller',
                element: <AllSeller />
            },
            {
                path: '/dashboard/allBuyer',
                element: <AllBuyer />
            },
            {
                path: '/dashboard/reportedItems',
                element: <ReportedItems />
            },
            {
                path: '/dashboard/orders',
                element: <MyOrders />
            },
            {
                path: '/dashboard/wishlist',
                element: <MyWishList />
            },
            {
                path: '/dashboard/addProduct',
                element: <AddProduct />
            },
            {
                path: '/dashboard/buyers',
                element: <MyBuyers />
            },
            {
                path: '/dashboard/products',
                element: <MyProducts />
            },

        ]
    }
])
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
import PrivateRouter from "./PrivateRouter";
import PrivateAdmin from "./PrivateAdmin";
import PrivateSeller from "./PrivateSeller";


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
            // {
            //     path: '/about',
            //     element: <Blogs />,
            // },
            // {
            //     path: '/contactUs',
            //     element: <Blogs />,
            // },
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
                element: <PrivateRouter><SingleCategoryAllAdds /></PrivateRouter>,
            },
            {
                path: '/categories/singlePhone/:id',
                element: <PrivateRouter><SingleProduct /></PrivateRouter>,
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRouter><Dashboard /></PrivateRouter>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard',
                // element: <AllSeller />
                // element: <MyProducts />
            },
            // admin items
            {
                path: '/dashboard/allSeller',
                element: <PrivateAdmin><AllSeller /></PrivateAdmin>
            },
            {
                path: '/dashboard/allBuyer',
                element: <PrivateAdmin><AllBuyer /></PrivateAdmin>
            },
            {
                path: '/dashboard/reportedItems',
                element: <PrivateAdmin><ReportedItems /></PrivateAdmin>
            },
            // normal user items
            {
                path: '/dashboard/orders',
                element: <PrivateRouter><MyOrders /></PrivateRouter>
            },
            {
                path: '/dashboard/wishlist',
                element: <PrivateRouter><MyWishList /></PrivateRouter>
            },
            // seller items
            {
                path: '/dashboard/addProduct',
                element: <PrivateSeller><AddProduct /></PrivateSeller>
            },
            {
                path: '/dashboard/buyers',
                element: <PrivateSeller><MyBuyers /></PrivateSeller>
            },
            {
                path: '/dashboard/products',
                element: <PrivateSeller><MyProducts /></PrivateSeller>
            },

        ]
    }
])
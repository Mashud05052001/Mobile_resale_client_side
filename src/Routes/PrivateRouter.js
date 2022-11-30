import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from '../Context/UserContext';
import Loading2 from '../Shared/Amination/Loading2';
import MobileLoading from '../Shared/Amination/MobileLoading';
const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <MobileLoading />
    }
    if (user) {
        return children
    }
    toast.error('First you have to login or register our website to get access this path.')
    return <Navigate to='/authentications/login' state={{ from: location }} replace />
};

export default PrivateRouter;
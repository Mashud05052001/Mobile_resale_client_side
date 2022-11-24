import React, { useContext } from 'react';
import { useLocation, Navigate } from "react-router-dom";
const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext();
    const location = useLocation();
    if (loading) {
        return 'loading...'
    }
    if (user) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace />
};

export default PrivateRouter;
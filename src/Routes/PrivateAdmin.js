import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from '../Context/UserContext';
import { useRole } from '../CustomHook/useRole';
import Loading2 from '../Shared/Amination/Loading2';
import MobileLoading from '../Shared/Amination/MobileLoading';
const PrivateAdmin = ({ children }) => {
    const { user, loading, logout } = useContext(AuthContext);
    const [role, isRoleLoading] = useRole(user?.email, user?.reloadUserInfo?.providerUserInfo[0]?.providerId);
    const location = useLocation();
    if (loading || isRoleLoading) {
        return <MobileLoading />
    }
    if (user && role === 'admin') {
        return children
    }
    logout().then(() => { }).catch(err => console.log(err))
    toast.error('We detect that you are not the admin of our website.');
    toast.error('Please Join With Admin id to access this path');
    return <Navigate to='/authentications/login' state={{ from: location }} replace />
};

export default PrivateAdmin;
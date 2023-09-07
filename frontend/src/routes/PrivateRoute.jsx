import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../auth/UserContext';

const PrivateRoute = () => {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;

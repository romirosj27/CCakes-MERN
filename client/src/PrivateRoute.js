
import React from 'react';
import { Route, Redirect, Navigate } from 'react-router-dom';
import useToken from './useToken';

const PrivateRoute = ({ children }) => {
    const { token, removeToken, setToken } = useToken(); 
    if (token===null || token===undefined){
        return (<Navigate to="/login" />);
    }
    return children;
}

export default PrivateRoute
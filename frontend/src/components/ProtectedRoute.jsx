import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import { useState, useEffect, useCallback } from 'react';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const response = await api.post('/api/token/refresh/', {
                refresh: refreshToken,
            });
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };
    const authToken = useCallback(async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
        } else {
            const decodedToken = jwtDecode(token);
            const tokenExpiration = decodedToken.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration < now) {
                await refreshToken();
            } else {
                setIsAuthorized(true);
            }
        }
    }, []);

    useEffect(() => {
        authToken().catch(() => setIsAuthorized(false));
    }, [authToken]);

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }
    return isAuthorized ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;

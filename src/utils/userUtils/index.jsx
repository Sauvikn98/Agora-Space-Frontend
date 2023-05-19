import { API_USERS_DELETE } from "../../lib/api";
import axios from "axios";

export const handleDeleteAccount = async (userId, accessToken, setUserData, navigate) => {
    try {
        // Make a request to the server to logout from all sessions
        await axios.post(API_USERS_DELETE(userId), null, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        localStorage.removeItem('recoil-persist')
        // Clear the user state to log out the user
        setUserData({ accessToken: null, refreshToken: null, userDetails: null });
        navigate('/');
        window.location.reload();
    } catch (error) {
        // Handle error response
        console.error(error);
    }
};

export const handleLogoutAllSessions = async (accessToken, setUserData, navigate) => {
    try {
        // Make a request to the server to logout from all sessions
        await axios.post(API_REFRESH_TOKEN_DELETE, null, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        localStorage.removeItem('recoil-persist')
        // Clear the user state to log out the user
        setUserData({ accessToken: null, refreshToken: null, userDetails: null });
        navigate('/');
        window.location.reload();
    } catch (error) {
        // Handle error response
        console.error(error);
    }
};
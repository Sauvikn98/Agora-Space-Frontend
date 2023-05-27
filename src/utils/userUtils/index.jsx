import { useRecoilState } from "recoil";
import { API_REFRESH_ACCESS_TOKEN, API_USERS_DELETE } from "../../lib/api";
import axios from "axios";
import { userAtom } from "../../recoil/atoms/userAtoms";

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

export const refreshAccessToken = async (refreshToken, setUser) => {
    try {
      const response = await axios.post(API_REFRESH_ACCESS_TOKEN, {
        refreshToken,
      });
  
      if (response.status === 200) {
        const newAccessToken = response.data.accessToken;
  
        // Update the access token in Recoil state
        setUser((prevUser) => ({
          ...prevUser,
          accessToken: newAccessToken,
        }));
      }
    } catch (error) {
      console.log(error)
    }
  };
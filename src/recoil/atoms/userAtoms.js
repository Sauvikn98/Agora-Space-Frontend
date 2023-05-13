import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { API_REFRESH_ACCESS_TOKEN, API_USERS_UPDATE } from '../../lib/api';
import axios from 'axios';

const persistConfig = {
  key: 'recoil-persist', // the key for the persisted data
  storage: localStorage, // the storage medium to use (localStorage, sessionStorage, etc.)
};

const { persistAtom } = recoilPersist(persistConfig)

export const userAtom = atom({
  key: 'user',
  default: {
    accessToken: null,
    refreshToken: null,
    userDetails: null,
  },
  effects_UNSTABLE: [persistAtom]
});



export const refreshToken = async (refreshToken) => {
  const user = useRecoilValue(userAtom);
  const setAcessToken = useSetRecoilState(user.accessToken);

  try {
    const response = await axios.post(API_REFRESH_ACCESS_TOKEN, { refreshToken });
    const { accessToken } = response.data;

    // Store the new access token
    setAcessToken((oldAccessToken) => [...oldAccessToken, response.data]);

    // Return or handle the new access token as needed
    return accessToken;
  } catch (error) {
    // Handle error response
    console.error(error);
  }
};


export const updateUser = async (user) => {
  const response = await fetch(API_USERS_UPDATE(user.id), {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const updatedUser = await response.json();
    const setUser = useSetRecoilState(userAtom);
    setUser(updatedUser);
    return true;
  }

  return false;
};
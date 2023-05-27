import { API_USERS_LOGIN, API_USERS_REGISTER } from "../../lib/api";
import { atom, } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const persistConfig = {
  key: 'recoil-persist', // the key for the persisted data
  storage: localStorage, // the storage medium to use (localStorage, sessionStorage, etc.)
};

const { persistAtom } = recoilPersist(persistConfig)

export const isAuthenticatedAtom = atom({
    key: 'isAuthenticated',
    default: false,
    effects_UNSTABLE: [persistAtom]
});

export const signIn = async (userName, password) => {
    const response = await fetch(API_USERS_LOGIN, {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const { accessToken, refreshToken, user } = await response.json();
        return { accessToken, refreshToken, user };
    }

    return false;
};


export const signUp = async (userName, email, password, avatar) => {
    const response = await fetch(API_USERS_REGISTER, {
        method: 'POST',
        body: JSON.stringify({ userName, email, password, avatar }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const { accessToken, refreshToken, user } = await response.json();
        return { accessToken, refreshToken, user };
    }
    return false;
};

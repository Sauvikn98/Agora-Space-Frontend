import { API_USERS_LOGIN, API_USERS_REGISTER } from "../../api/api";
import { atom, } from 'recoil';

export const isAuthenticatedAtom = atom({
    key: 'isAuthenticated',
    default: false,
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
        const { token, user } = await response.json();
        return { token, user };
    }

    return false;
};


export const signUp = async (userName, email, password) => {
    const response = await fetch(API_USERS_REGISTER, {
        method: 'POST',
        body: JSON.stringify({ userName, email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const { token, user } = await response.json();
        return { token, user };
    }
    return false;
};

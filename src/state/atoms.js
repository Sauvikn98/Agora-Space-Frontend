import { atom } from 'recoil';

export const userState = atom({
    key: 'userState',
    default: {
        userName: null,
        token: null,
        error: null,
    },
});



export const createUser = atom({
    key: 'createUser',
    default: null,
});

export const loginUser = atom({
    key: 'loginUser',
    default: null,
});

export const getUserById = atom({
    key: 'getUserById',
    default: null,
});

export const getUserByUserName = atom({
    key: 'getUserByUserName',
    default: null,
});

export const updateUser = atom({
    key: 'updateUser',
    default: null,
});

export const deleteUser = atom({
    key: 'deleteUser',
    default: null,
});

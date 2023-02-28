import { selector } from "recoil";
import { userState } from "./atoms";

export const isLoggedInSelector = selector({
    key: "isLoggedInSelector",
    get: ({ get }) => {
        const user = get(userState);
    },
});

export const userSelector = selector({
    key: "userSelector",
    get: ({ get }) => {
        const user = get(userState);
        return user;
    },
});

export const userNameSelector = selector({
    key: "userNameSelector",
    get: ({ get }) => {
        const user = get(userState);
        return user.userName;
    },
});

export const userIdSelector = selector({
    key: "userIdSelector",
    get: ({ get }) => {
        const user = get(userState);
        return user.id;
    },
});

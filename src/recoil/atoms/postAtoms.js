import { atom } from "recoil";

export const createNewpost = atom({
  key: "postsState",
  default: [],
});

export const getAllPosts = atom({
  key: "posts",
  default: [],
});
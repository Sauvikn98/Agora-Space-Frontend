import { atom } from "recoil";

export const spacesState = atom({
  key: "spacesState",
  default: [],
});

export const latestSpacePost = atom({
  key: 'spacePostsState',
  default: [],
});

export const labelsState = atom({
  key: 'labelsState',
  default: [],
});

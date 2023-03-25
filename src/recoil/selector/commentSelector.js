import { selector } from "recoil";
import { commentsState } from "../atoms/commentAtoms";

// Define selector to get all comments
export const getAllComments = selector({
    key: 'getAllComments',
    get: ({ get }) => {
      const comments = get(commentsState);
      return comments;
    },
  });
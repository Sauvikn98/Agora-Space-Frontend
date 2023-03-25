import { atom } from "recoil";

export const newCommentState = atom({
  key: 'newCommentState',
  default: '',
});

export const commentsState = atom({
  key: 'createComment',
  default: []
});


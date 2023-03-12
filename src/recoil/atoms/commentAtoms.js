import { atom } from "recoil";

export const newCommentState = atom({
    key: 'newCommentState',
    default: {
      post: null,
      author: null,
      parentComment: null,
      content: '',
    },
  });

export const commentsState = atom({
    key: 'createComment',
    default: []
});


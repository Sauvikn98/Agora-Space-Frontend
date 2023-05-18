import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { API_USERS_ADD_BOOKMARK, API_USERS_GET_ALL_BOOKMARKS, API_USERS_UPDATE } from '../../lib/api';
import axios from 'axios';
import { useState } from 'react';

const persistConfig = {
  key: 'recoil-persist', // the key for the persisted data
  storage: localStorage, // the storage medium to use (localStorage, sessionStorage, etc.)
};

const { persistAtom } = recoilPersist(persistConfig)

export const userAtom = atom({
  key: 'user',
  default: {
    token: null,
    userDetails: null,
  },
  effects_UNSTABLE: [persistAtom]
});


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

export const addBookmark = async (user, postId) => {
  try {
    const response = await axios.post(API_USERS_ADD_BOOKMARK(postId), null, {
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      }
    });
    console.log(response.data.message); // Post bookmarked successfully
  } catch (error) {
    console.error(error);
    console.log(user.accessToken)
  }
};
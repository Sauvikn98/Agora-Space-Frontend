import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { API_USERS_UPDATE } from '../../lib/api';

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
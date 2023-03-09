import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const persistConfig = {
  key: 'recoil-persist', // the key for the persisted data
  storage: localStorage, // the storage medium to use (localStorage, sessionStorage, etc.)
};

const { persistAtom } = recoilPersist(persistConfig)

export const authState = atom({
    key: 'authState',
    default: {
      isAuthenticated: false,
      user: null,
      token: null,
    },
    effects_UNSTABLE: [persistAtom],
  });

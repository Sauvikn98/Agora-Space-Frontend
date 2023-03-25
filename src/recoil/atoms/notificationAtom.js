import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const persistConfig = {
  key: 'recoil-persist', // the key for the persisted data
  storage: localStorage, // the storage medium to use (localStorage, sessionStorage, etc.)
};

const { persistAtom } = recoilPersist(persistConfig)

export const notificationsState = atom({
  key: 'notificationsState',
  default: [],
  effects_UNSTABLE: [persistAtom]
});
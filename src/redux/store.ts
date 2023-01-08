import { combineReducers,configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


import loginReducer from './apps/LoginSlice';
import profileReducer from './apps/ProfileSlice';

// export const store = configureStore({
//   reducer: {
//     login: loginReducer,
//     products: loginReducer,
//     // devTools: process.env.NODE_ENV !== 'production',
//   },
// });

const persistConfig = {
  key: 'rootAppTransys',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['login'],
};

const rootReducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
});

const persistedReducer  = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
import {configureStore,combineReducers, Reducer} from "@reduxjs/toolkit";
import authSlice from "./Auth/authSlice";
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./cart/cartSlice";

// const secretkey = import.meta.env.VITE_REDUX_PERSIST_SECRET_KEY;

const persistConfig ={
  key:"root",
  version:1,
  storage:storage,
  transforms:[
    encryptTransform({
      secretKey: "831476e3ea64e7868101b191c65eebddbe123408",
      onError: function (error) {
        console.log("Problem Occured while encrypting data",error)
      },
    }),
  ]
};


const rootReducer:Reducer = combineReducers({
  auth: authSlice,
  cart:cartSlice
})


const persistedReducer = persistReducer(persistConfig,rootReducer)






const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
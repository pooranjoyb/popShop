import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './utils/features/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { GoogleOAuthProvider } from '@react-oauth/google';


const persistor = persistStore(store);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="590956334750-mtmvisc4r6tk62f1v6j37ajb8ve5u8ib.apps.googleusercontent.com" >
      <App />
      </GoogleOAuthProvider>
    
    </Provider>
    </PersistGate>
  </React.StrictMode>,
)

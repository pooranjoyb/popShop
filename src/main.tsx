
import ReactDOM from 'react-dom/client'
import React from "react";
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './utils/features/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'



const persistor = persistStore(store);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

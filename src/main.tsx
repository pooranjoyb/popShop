import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './utils/features/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'



const persistor = persistStore(store);


ReactDOM.createRoot(document.getElementById('root')!).render(

    <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
    </PersistGate>

)

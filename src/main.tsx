// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import axios from 'axios';
import { store } from './store/store';
import App from './App.tsx';
import './index.css';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common['Content-Type'] = 'application/json';

createRoot(document.getElementById('root')!).render(
 <StrictMode>
   <Provider store={store}>
     <App />
   </Provider>
 </StrictMode>
);
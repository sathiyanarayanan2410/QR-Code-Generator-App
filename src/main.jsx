import './scss/bootstrap.scss'
import './scss/styles.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import axios from 'axios'

import { Toaster } from 'sonner'

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

// prettier-ignore
ReactDOM
  .createRoot(document.getElementById("root"))
  .render(
    <React.StrictMode>
      <App />
      <Toaster richColors />
    </React.StrictMode>
  );

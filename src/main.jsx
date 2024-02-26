import './scss/bootstrap.scss'
import './scss/styles.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'

import axios from 'axios'
import App from './App'

import { Toaster } from 'sonner'

axios.defaults.baseURL = 'http://localhost:3000/'

// prettier-ignore
ReactDOM
  .createRoot(document.getElementById("root"))
  .render(
    <React.StrictMode>
      <App />
      <Toaster richColors />
    </React.StrictMode>
  );

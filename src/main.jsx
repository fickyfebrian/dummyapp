import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { MantineProvider } from '@mantine/core'

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </MantineProvider>
)
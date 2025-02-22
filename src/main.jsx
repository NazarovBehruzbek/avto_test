import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './Routers/Router.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router}/>
    <ToastContainer/>
  </StrictMode>,
)

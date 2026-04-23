import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './firebase.js' // Initialize Firebase SDK and Analytics
import './google-cloud.js' // Initialize Google Cloud Translate
import './google-maps.js' // Initialize Google Maps Loader

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

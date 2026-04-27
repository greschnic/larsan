import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Убрали расширение .jsx, так Vite надежнее
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

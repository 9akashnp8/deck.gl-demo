import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App bounds={[
      [54.0, 24.1],
      [54.5, 24.5]
    ]} />
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App'
import './index.css'

if (window.location.pathname !== '/') {
  window.history.replaceState(null, '', '/')
}

registerSW({
  immediate: true,
  onRegisteredSW: (_swUrl, registration) => {
    if (!registration) return

    const checkForUpdate = () => {
      if (navigator.onLine) void registration.update().catch(() => {})
    }

    window.addEventListener('online', checkForUpdate)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) checkForUpdate()
    })
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

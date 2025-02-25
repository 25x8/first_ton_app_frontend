import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TonConnectUIProvider from './external/TonConnectUIProvider.tsx'

const manifestUrl = 'https://raw.githubusercontent.com/25x8/first_ton_app_frontend/master/public/manifest.json';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
    </TonConnectUIProvider>
  </StrictMode>,
)

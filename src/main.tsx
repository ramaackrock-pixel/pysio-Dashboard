import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SearchProvider } from './context/SearchContext'
import { AppDataProvider } from './context/AppDataContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppDataProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </AppDataProvider>
  </StrictMode>,
)

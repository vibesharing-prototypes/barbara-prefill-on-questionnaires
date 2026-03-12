import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AtlasThemeProvider } from '@diligentcorp/atlas-react-bundle'
import '@diligentcorp/atlas-react-bundle/styles'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AtlasThemeProvider>
      <App />
    </AtlasThemeProvider>
  </StrictMode>,
)

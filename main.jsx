import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AtlasThemeProvider } from '@diligentcorp/atlas-react-bundle'
import '@diligentcorp/atlas-react-bundle/styles'
import { QuestionnaireProvider } from './context/QuestionnaireContext'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AtlasThemeProvider>
        <QuestionnaireProvider>
          <App />
        </QuestionnaireProvider>
      </AtlasThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)

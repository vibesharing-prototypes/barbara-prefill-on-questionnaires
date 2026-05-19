import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MockAtlasThemeProvider } from './mocks/MockAtlasProvider'
import { QuestionnaireProvider } from './context/QuestionnaireContext'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MockAtlasThemeProvider>
        <QuestionnaireProvider>
          <App />
        </QuestionnaireProvider>
      </MockAtlasThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)

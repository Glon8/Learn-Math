import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "./components/ui/provider"
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from './components/ui/color-mode.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider>

      <ChakraProvider value={defaultSystem}>

        <ColorModeProvider>

          <App />

        </ColorModeProvider>

      </ChakraProvider>

    </Provider>

  </StrictMode>,
)

import React from 'react'
import { createRoot } from 'react-dom/client'
import { ProviderValue } from './layouts/ProviderValue'

import App from './App'
import GlobalStyles from './components/GlobalStyles'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <GlobalStyles>
    <ProviderValue>
      <App />
    </ProviderValue>
  </GlobalStyles>
)

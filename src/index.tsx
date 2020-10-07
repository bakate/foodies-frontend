import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { MamaProvider } from './shared/context'
import ScrollToTop from './shared/utils/ScrollToTop'

render(
  <StrictMode>
    <MamaProvider>
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </MamaProvider>
  </StrictMode>,
  document.getElementById('root')
)

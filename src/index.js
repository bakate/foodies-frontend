import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { MamaProvider } from './shared/context'
import ScrollToTop from './shared/utils/ScrollToTop'

ReactDOM.render(
  <>
    <MamaProvider>
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </MamaProvider>
  </>,
  document.getElementById('root')
)

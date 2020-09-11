import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { MamaProvider } from './shared/context'

ReactDOM.render(
  <>
    <MamaProvider>
      <Router>
        <App />
      </Router>
    </MamaProvider>
  </>,
  document.getElementById('root')

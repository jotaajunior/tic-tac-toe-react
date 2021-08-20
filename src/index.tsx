import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { GameProvider } from './context/GameContext'

import './globals.css'

ReactDOM.render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,

  document.getElementById('root'),
)

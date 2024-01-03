import React from 'react'
import { createRoot } from 'react-dom/client'
import { Routes } from './pages/routes'
import '@picocss/pico'
import './style/global.css'

export default
function() {
  createRoot(
    document.querySelector('body')
  )
  .render(<App />)
}

const App = () =>
  <>
    <Routes />
  </>

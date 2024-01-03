import React from 'react'
import { createRoot } from 'react-dom/client'
import '@picocss/pico'
import { Routes } from './pages/routes'

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

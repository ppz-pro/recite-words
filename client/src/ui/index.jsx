import React from 'react'
import { createRoot } from 'react-dom/client'
import '@exampledev/new.css'
import { Routes } from './pages/routes'

export default
function() {
  createRoot(
    document.getElementById('app_root')
  )
  .render(<App />)
}

const App = () =>
  <>
    <Routes />
  </>

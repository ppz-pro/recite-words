import React from 'react'
import { createRoot } from 'react-dom/client'

export default
function() {
  createRoot(
    document.getElementById('app_root')
  )
  .render(<App />)
}

const App = () => <div>hello world</div>

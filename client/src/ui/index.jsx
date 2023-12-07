import React from 'react'
import { createRoot } from 'react-dom/client'
import { css } from '@emotion/react'

export default
function() {
  createRoot(
    document.getElementById('app_root')
  )
  .render(<App />)
}

const App = () =>
  <div
    css = {css`
      color: red;
      span {
        color: green;
      }
    `}
  >
    hello world
    <span>haha</span>
  </div>

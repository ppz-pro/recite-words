import React from 'react'
import { createRoot } from 'react-dom/client'
import { css } from '@emotion/react'
import { Route } from 'wouter'
import { pages } from '../ss/router'

export default
function() {
  createRoot(
    document.getElementById('app_root')
  )
  .render(<App />)
}

const App = () =>
  <>
    <Route path = {pages.home.path}></Route>
    <Route path = {pages.login.path}></Route>
  </>

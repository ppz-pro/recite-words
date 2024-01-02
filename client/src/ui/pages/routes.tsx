import { FC } from 'react'
import { Route } from 'wouter'
import { pages } from '../../ss/router'

import { Home_page } from './home'
import { Login_page } from './login'
import { History_page } from './history'

const routes: [string, FC][] = [
  [pages.home.path, Home_page],
  [pages.login.path, Login_page],
  [pages.history.path, History_page],
]

export
const Routes: FC = () =>
  routes.map(route => {
    const Page = route[1]
    return <Route
      key = {route[0]}
      path = {route[0]}
    >
      <Page />
    </Route>
  })

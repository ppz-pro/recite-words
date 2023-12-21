import { FC } from 'react'
import { Props } from '../../../types'
import { logout } from '../../../ss/auth'

export
const Layout: FC<Props.Children> = ({ children }) =>
  <>
    <button
      onClick = {logout}
    >Logout</button>
    {children}
  </>

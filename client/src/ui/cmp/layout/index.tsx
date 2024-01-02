import { FC, Fragment } from 'react'
import { Props } from '../../../types'
import { logout } from '../../../ss/auth'
import { Login_required } from '../login_required'

interface Layout_props extends Props.Children {
  login_required: boolean
}

export
const Layout: FC<Layout_props> = ({ login_required, children }) => {
  const Login = login_required ? Login_required : Fragment
  return <Login>
    <button
      onClick = {logout}
    >Logout</button>
    {children}
  </Login>
}

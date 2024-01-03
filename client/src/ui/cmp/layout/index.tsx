import { FC, Fragment } from 'react'
import { Link } from 'wouter'
import { Props } from '../../../types'
import { logout } from '../../../ss/auth'
import { pages } from '../../../ss/router'
import { Login_required } from '../login_required'
import { Search_input } from './search_input'

interface Layout_props extends Props.Children {
  login_required: boolean
}

export
const Layout: FC<Layout_props> = ({ login_required, children }) => {
  const Login = login_required ? Login_required : Fragment
  return <Login>
    <nav className='container'>
      <ul>
        <li>
          <Link href={pages.home.path}>
            <h1 style={{ marginBottom: 0 }}>
              Recite Words
            </h1>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Search_input />
        </li>
        <li>
          <Link href={pages.history.path}>history</Link>
        </li>
        <li>
          <a onClick = {logout} href = "#">Logout</a>
        </li>
      </ul>
    </nav>

    <main className='container'>
      {children}
    </main>
  </Login>
}

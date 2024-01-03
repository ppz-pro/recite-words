import { FC, Fragment } from 'react'
import { Link } from 'wouter'
import { css } from '@emotion/react'

import { mq } from '../../common/media_query'
import { Props } from '../../../types'
import { logout } from '../../../ss/auth'
import { pages } from '../../../ss/router'
import { Login_required } from '../login_required'
import { Search_input } from './search_input'
import { useSet_lookup_target } from '../../../ss/lookup'

interface Layout_props extends Props.Children {
  login_required: boolean
}

export
const Layout: FC<Layout_props> = ({ login_required, children }) => {
  const Login = login_required ? Login_required : Fragment
  const set_lookup_target = useSet_lookup_target()
  return <Login>
    <nav className='container'>
      <ul
        css = {css({
          [mq.sm]: {
            display: 'none',
          },
          h1: {
            fontSize: '1.2rem',
          },
        })}
      >
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
          <a
            onClick = {() => {
              set_lookup_target(() => '')
            }}
            href = '#'
          >history</a>
        </li>
        <li>
          <a
            onClick = {logout}
            href = '#'
          >Logout</a>
        </li>
      </ul>
    </nav>

    <main className='container'>
      {children}
    </main>
  </Login>
}

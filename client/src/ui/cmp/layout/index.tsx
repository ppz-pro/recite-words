import { FC } from 'react'
import { Props } from '../../../types'
import { empty_token } from '../../../ss/auth'

export
const Layout: FC<Props.Child> = ({ children }) =>
  <>
    <button
      onClick = {empty_token}
    >Logout</button>
    {children}
  </>

import { FC, useEffect } from 'react'
import { useHas_login } from '../../ss/auth'
import { useNav_login } from '../../ss/router'
import { Props } from '../../types'

export
const Login_required: FC<Props.Child> = ({ children }) => {
  const has_login = useHas_login()
  const nav_login = useNav_login()
  useEffect(
    () => {
      if (!has_login)
        nav_login()
    },
    [has_login], // true 变 false 时，自动跳转
  )
  return has_login && children
}

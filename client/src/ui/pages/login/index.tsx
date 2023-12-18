import { FC } from 'react'
import { Err_code } from '../../../../../server/common/err_code'
import { useInput } from '../../common/hooks'
import { login } from '../../../ss/auth'
import { HTTP_err } from '../../../ss/http'
import { pages } from '../../../ss/router'

export
const Login_page: FC = () => {
  const nav_home = pages.home.useNav()

  const username_input = useInput()
  const password_input = useInput({
    type: 'password',
  })
  return <>
    {username_input.el}
    {password_input.el}
    <button
      onClick = {async () => {
        try {
          await login(username_input.val, password_input.val)
          nav_home()
        } catch(err) {
          if (err instanceof HTTP_err) {
            if (err.code == Err_code.WRONG_USERNAME_OR_PASSWORD)
              alert('wrong username or password')
            else
              throw err
          } else
            throw err
        }
      }}
    >Login</button>
  </>
}

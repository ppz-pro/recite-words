import { FC } from 'react'
import { useInput } from '../../common/hooks'

export
const Login_page: FC = () => {
  const username_input = useInput()
  const password_input = useInput({
    type: 'password',
  })
  return <>
    {username_input.el}
    {password_input.el}
    <button
      onClick = {() => {
        
      }}
    >Login</button>
  </>
}

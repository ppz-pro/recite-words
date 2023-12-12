import { FC } from 'react'
import { useInput } from '../../common/hooks'
import { Login_required } from '../../cmp/login_required'

export
const Home_page: FC = () => {
  const word_input = useInput()
  const search = () => {

  }
  return <Login_required>
    <div>
      {word_input.el}
      <button
        onClick = {search}
      >Search</button>
    </div>
  </Login_required>
}

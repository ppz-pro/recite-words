import { FC } from 'react'
import { useInput } from '../../common/hooks'
import { Login_required } from '../../cmp/login_required'
import { lookup } from '../../../ss/lookup'

export
const Home_page: FC = () => {
  const word_input = useInput()
  const _lookup = () => {
    console.log('result', lookup(word_input.val))
  }
  return <Login_required>
    <div>
      {word_input.el}
      <button
        onClick = {_lookup}
      >Search</button>
    </div>
  </Login_required>
}

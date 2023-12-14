import { FC, useState } from 'react'
import { useInput } from '../../common/hooks'
import { Login_required } from '../../cmp/login_required'
import { Layout } from '../../cmp/layout'
import { Word_card } from '../../cmp/word_card'

export
const Home_page: FC = () => {
  const word_input = useInput()
  const [target, set_target] = useState<null | string>(null)
  const _lookup = () => {
    if (word_input.val.length)
      set_target(word_input.val)
    else
      alert('no word?')
  }
  return <Layout>
    <Login_required>
      <div>
        {word_input.el}
        <button
          onClick = {_lookup}
        >Search</button>
      </div>
      {target && <Word_card word = {target} />}
    </Login_required>
  </Layout>
}

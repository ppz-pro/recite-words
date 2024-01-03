import { FC, useState } from 'react'
import { useFlag, useMount } from '../../../lib/hooks'

import { useInput } from '../../common/hooks'
import { Layout } from '../../cmp/layout'
import { Word_card } from '../../cmp/word_card'

export
const Home_page: FC = () => {
  const _lookup = () => {
    if (word_input.val.length) {
      set_target(word_input.val)
      incr_flag()
    } else
      alert('no word?')
  }

  const word_input = useInput({
    on_enter: _lookup,
  })
  useMount(() => {
    const query = new URLSearchParams(location.search)
    const word = query.get('word')
    if (word !== null) {
      word_input.set(word)
      set_target(word)
    }
  })
  const [target, set_target] = useState<null | string>(null)
  const [flag, incr_flag] = useFlag()
  return <Layout login_required>
    <div>
      {word_input.el}
      <button
        onClick = {_lookup}
      >Search</button>
    </div>
    {target && <Word_card flag = {flag} word = {target} />}
  </Layout>
}

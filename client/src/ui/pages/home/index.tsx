import { FC } from 'react'

import { Layout } from '../../cmp/layout'
import { Word_card } from '../../cmp/word_card'
import { useVal_lookup_target } from '../../../ss/lookup'

export
const Home_page: FC = () => {
  const target = useVal_lookup_target()

  return <Layout login_required>
    {target && <Word_card word = {target} />}
  </Layout>
}

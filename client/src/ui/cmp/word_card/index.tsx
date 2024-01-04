import { FC, useState } from 'react'

import { Paraphrase } from '../../../../../server/common/types'
import { Err_code } from '../../../../../server/common/err_code'
import { HTTP_err } from '../../../ss/http'
import { lookup } from '../../../ss/lookup'
import { useWatch } from '../../common/hooks'
import { Paraphrase_card } from './paraphrase'

interface Props {
  word: string
  flag?: number
}

export
const Word_card: FC<Props> = ({ word, flag }) => {
  const [paraphrases, set_paraphrases] = useState<Paraphrase[] | null>(null)
  useWatch([word, flag], async () => {
    set_paraphrases(null)
    try {
      set_paraphrases(await lookup(word))
    } catch(err) {
      if (err instanceof HTTP_err) {
        switch (err.code) {
          case Err_code.NO_PARAPHRASE:
            alert('no paraphrase found')
            return
          case Err_code.WRONG_WORD:
            alert('word not found')
            return
          default:
            console.error(err.code)
            console.error(err)
            alert(`unknown error 1, code: ${err.code}`)
            return
        }
      }
      console.error(err)
      // alert('unknown error 2')
    }
  })

  return <div>
    <h3>{word}</h3>
    {paraphrases
      ? paraphrases.map(p =>
        <Paraphrase_card
          val = {p}
          key = {p.meta.id}
        />
      )
      : 'loading'
    }
  </div>
}

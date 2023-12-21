import { css } from '@emotion/react'
import { FC, useState } from 'react'
import { lookup } from '../../../ss/lookup'
import { useWatch } from '../../common/hooks'
import { Paraphrase } from '../../../../../server/common/types'
import { Paraphrase_card } from './paraphrase'

interface Props {
  word: string
}

export
const Word_card: FC<Props> = ({ word }) => {
  const [paraphrases, set_paraphrases] = useState<Paraphrase[] | null>(null)
  useWatch([word], async () => {
    set_paraphrases(null)
    set_paraphrases(await lookup(word))
  })

  return <div
    css = {css`
  
    `}
  >
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

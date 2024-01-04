import { FC, useState } from 'react'

import { Paraphrase } from '../../../../../server/common/types'
import { Err_code } from '../../../../../server/common/err_code'
import { HTTP_err } from '../../../ss/http'
import { lookup } from '../../../ss/lookup'
import { useWatch } from '../../common/hooks'
import { Paraphrase_card } from './paraphrase'
import { useData } from '../../../lib/hooks/data'
import { Result_view } from '../result_view'

interface Props {
  word: string
}

export
const Word_card: FC<Props> = ({ word }) => {
  const { data, error, loading } = useData<Paraphrase[]>({
    get: async () => {
      return await lookup(word)
    },
    deps: [word],
  })

  return <div>
    <h3>{word}</h3>
    <Result_view<Paraphrase[]>
      loading = {loading}
      error = {error}
      data = {data}

      Error = {(err) => {
        if (err instanceof HTTP_err) {
          switch (err.code) {
            case Err_code.NO_PARAPHRASE:
              return 'no paraphrase found'
            case Err_code.WRONG_WORD:
              return 'word not found'
            default:
              console.error(err.code)
              console.error(err)
              return `unknown error code: ${err.code}`
          }
        }
        console.error(err)
        return 'bug'
      }}

      Data = {({ data }) =>
        data.map(p =>
          <Paraphrase_card
            val = {p}
            key = {p.meta.id}
          />
        )
      }
    />
  </div>
}

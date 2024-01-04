import { FC } from 'react'
import { Paraphrase } from '../../../../../server/common/types'

interface Props {
  val: Paraphrase
}

export
const Paraphrase_card: FC<Props> = ({ val }) => {
  return <article>
    <hgroup>
      <h5>{val.hwi.hw}</h5>
      <p>{val.fl}</p>
    </hgroup>

    <ul>
      {val.shortdef.map(item => <li key = {item}>{item}</li>)}
    </ul>
  </article>
}

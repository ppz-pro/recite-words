import { FC } from 'react'
import { Paraphrase } from '../../../../../server/common_types'

interface Props {
  val: Paraphrase
}
export
const Paraphrase_card: FC<Props> = ({ val }) => {
  return <ul>
    {val.shortdef.map(item => <li>{item}</li>)}
  </ul>
}
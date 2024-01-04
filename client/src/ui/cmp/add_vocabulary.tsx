import { FC } from 'react'
import { add_vocabulary } from '../../ss/vocabulary'

interface Props {
  word: string
  on_added?: () => void
}

export
const Add_vocabulary: FC<Props> = ({ word, on_added }) => {
  return <a
    href = '#'
    className = 'secondary'
    onClick = {async () => {
      await add_vocabulary(word)
      on_added?.()
    }}
  >+</a>
}

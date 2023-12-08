import { FC } from 'react'
import { useInput } from '../../common/hooks'

export
const Home_page: FC = () => {
  const word_input = useInput()
  const search = () => {

  }
  return <>
    <div>
      {word_input.el}
      <button
        onClick = {search}
      >Search</button>
    </div>
  </>
}

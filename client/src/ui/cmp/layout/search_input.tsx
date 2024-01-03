import { useSet_lookup_target } from '../../../ss/lookup'
import { useInput } from '../../common/hooks'

export
const Search_input = () => {
  const set_target = useSet_lookup_target()
  const input = useInput({
    type: 'search',
    on_enter: () => {
      set_target(() => input.val)
    },
  })
  return input.el
}

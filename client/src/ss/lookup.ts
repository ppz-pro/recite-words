import { State } from '../lib/store'
import { get_auth_header } from './auth'
import { http } from './http'
import { Paraphrase } from '../../../server/common/types'

const target_state = State<string>('')

export
const useSet_lookup_target = target_state.useSet
export
const useVal_lookup_target = target_state.useVal

export
const lookup = async (word: string): Promise<Paraphrase[]> => {
  return await http.GET('/lookup', { word }, get_auth_header()) as Paraphrase[]
}

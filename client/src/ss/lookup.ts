import { get_auth_header } from './auth'
import { http } from './http'
import { Paraphrase } from '../../../server/common/types'

export
const lookup = async (word: string): Promise<Paraphrase[]> => {
  return await http.GET('/lookup', { word }, get_auth_header()) as Paraphrase[]
}

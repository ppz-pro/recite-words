import { http } from './http'
import { get_auth_header } from './auth'

export
const add_vocabulary = async (word: string) => {
  return await http.POST('/vocabulary', { word }, get_auth_header())
}

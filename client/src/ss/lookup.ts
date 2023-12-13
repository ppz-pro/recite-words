import { get_auth_header } from './auth'
import { http } from './http'

export
const lookup = (word: string) => {
  return http.GET('/lookup', { word }, get_auth_header())
}

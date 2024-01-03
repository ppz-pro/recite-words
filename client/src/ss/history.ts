import { get_auth_header } from './auth'
import { http } from './http'
import { useData } from '../lib/hooks/data'

export
interface History_record {
  word: string
  id: string
}
export
const useData_history = (deps?: unknown[]) =>
  useData<History_record[]>({
    get: async () => {
      return await http.GET('/history', null, get_auth_header()) as History_record[]
    },
    deps,
  })

export
const drop_history = async (id: string) => {
  await http.DELETE('/history?id=' + id, null, get_auth_header())
}
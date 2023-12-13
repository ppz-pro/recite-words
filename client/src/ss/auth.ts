import { Persist_store } from '../lib/store/persist'
import { http } from './http'

const token_store = Persist_store('token', null)

export
const set_token = (token: string) => {
  // 虽然只有一行代码，“不用大括号显得好看”，但用大括号来表明“没有返回值”，能增加确定性
  token_store.set((_old: string | null) => token)
}

export
const useHas_login = () =>
  token_store.useVal() !== null

export
const login = async (username: string, password: string) => {
  const token = await http.POST('/api/login', {
    username,
    password,
  })
  if (typeof token == 'string' && token.length)
    return token
  else
    throw Error('login error, no token in success res')

}
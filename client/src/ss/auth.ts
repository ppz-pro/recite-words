import { State_persist_nullable } from '../lib/store/persist'
import { http } from './http'

const token_store = State_persist_nullable('token')

const set_token = (token: string | null) => {
  // 虽然只有一行代码，“不用大括号显得好看”，但用大括号来表明“没有返回值”，能增加确定性
  token_store.set((_old: string | null) => token)
}
export
const empty_token = () => set_token(null)
export
const logout = async () => {
  const res = http.POST('/logout', null, get_auth_header())
  empty_token()
  await res
}

export
const get_auth_header = () => {
  const Token = token_store.get()
  if (Token === null)
    throw Error('no token')
  return { Token }
}

export
const useHas_login = () =>
  token_store.useVal() !== null

export
const login = async (username: string, password: string) => {
  const token = await http.POST('/login', {
    username,
    password,
  })
  if (typeof token == 'string' && token.length)
    set_token(token)
  else
    throw Error('login error, no token in success res')
}

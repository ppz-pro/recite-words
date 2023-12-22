import { State } from '.'
import { Check_unique } from '../unique'

const decorated_key = (() => {
  const check_unique = Check_unique()
  const key_prefix = 'PPz_awesome!_'
  return (key: string) => {
    check_unique(key)
    return key_prefix + key
  }
})()

/**
 * value 被存到 localStorage 或 sessionStorage 里的 State，
 * 为了保持开发者脑子里的确定性，这里只接收 string 类型的值。
 * （实在忍不住，可以存 json）
 */

export
/**
 * 不可空的 persist state。
 * 必须传入初始值。
 */
const State_persist = (key: string, init_val: string, storage = localStorage) => {
  key = decorated_key(key)
  const last_val = storage.getItem(key)
  if (last_val !== null) // 上次已经存了值
    init_val = last_val
  else // 没有值 => 第一次 => 存初始值
    localStorage.setItem(key, init_val)

  const state = State<string>(init_val)
  state.subscribe(() =>
    storage.setItem(key, state.get())
  )

  return state
}

export
const State_persist_nullable = (key: string, storage = localStorage) => {
  key = decorated_key(key)
  let last_val = storage.getItem(key)
  const state = State<string | null>(last_val)
  state.subscribe(() => {
    const new_val = state.get()
    if (new_val === null)
      storage.removeItem(key)
    else
      storage.setItem(key, new_val)
  })
  
  return state
}

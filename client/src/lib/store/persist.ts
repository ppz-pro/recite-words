import { Store } from '.'

/**
 * value 被存到 localStorage 或 sessionStorage 里的 Store，
 * 为了保持开发者脑子里的确定性，这里只接收 string 类型的值。
 * （实在忍不住，可以存 json）
 */
export
const Persist_store = (key: string, initial_val: string | null, storage = localStorage) => {
  key = 'PPz_awesome!_' + key
  const last_val = storage.getItem(key)
  if (last_val !== null) // 上次已经存了值
    initial_val = last_val
  else { // 没有值 => 第一次 => 存初始值
    if (initial_val !== null)
      localStorage.setItem(key, initial_val)
  }

  const store = Store<string>(initial_val)
  store.subscribe(() => {
    const val = store.get()
    if (val !== null)
      storage.setItem(key, val)
    else
      storage.removeItem(key)
  })

  return store
}

import { Store } from '.'

export
const Persist_store = <Val>(key: string, initial_val: Val, storage = localStorage) => {
  key = 'PPz_awesome!_' + key
  const last_val = parse_last<Val>(localStorage, key)
  if (last_val !== null)
    initial_val = last_val
  const store = Store<Val>(initial_val)
  store.subscribe(() => {
    storage.setItem(key, JSON.stringify(store.get()))
  })

  return store
}

const parse_last = <Val>(storage: Storage, key: string) => {
  const str = storage.getItem(key)
  if (str === null)
    return null
  else
    return JSON.stringify(str) as Val
}

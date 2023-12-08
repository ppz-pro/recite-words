import { useSyncExternalStore } from 'react'

type Listener = () => void

export
const Store = <Val>(val: Val) => {
  const listeners: Listener[] = []
  const subscribe = (listener: Listener) => {
    listeners.push(listener)
    return () =>
      listeners.splice(listeners.indexOf(listener), 1)
  }

  const set = (calc_val: () => Val) => {
    const new_val = calc_val()
    for (const l of listeners)
      l()
    val = new_val
  }
  const get = () => val

  const useVal = () => useSyncExternalStore<Val>(subscribe, get)
  return  {
    useVal,
    useSet: () => set,
    set,
    useState: () => [
      useVal(),
      set,
    ],
  }
}

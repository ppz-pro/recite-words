import { useSyncExternalStore } from 'react'

type Listener = () => void

export
const Store = <True_val>(val: True_val | null) => {
  type Val = True_val | null
  const listeners: Listener[] = []
  const subscribe = (listener: Listener) => {
    listeners.push(listener)
    return () =>
      listeners.splice(listeners.indexOf(listener), 1)
  }

  const set = (calc_val: (old: Val) => Val) => {
    val = calc_val(val)
    for (const l of listeners)
      l()
  }
  const get = () => val

  const useVal = () => useSyncExternalStore<Val>(subscribe, get)
  return  {
    get,
    set,
    useVal,
    useSet: () => set,
    subscribe,
    useState: () => [
      useVal(),
      set,
    ],
  }
}

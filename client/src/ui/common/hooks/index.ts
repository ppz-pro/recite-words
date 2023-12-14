import { DependencyList, useEffect } from 'react'

export * from './form'

export
const useWatch = (watch_target: DependencyList | undefined, cb: () => void) => {
  useEffect(() => {
    cb() // 大括号防止 return
  }, watch_target)
}

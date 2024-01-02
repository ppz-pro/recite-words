import { DependencyList, useEffect, useState } from 'react'

export
const useFlag = (): [number, () => void] =>  {
  const [flag, set_flag] = useState(0)
  return [flag, () => set_flag(flag + 1)]
}

export
const useWatch = (deps: DependencyList, cb: () => void) => {
  useEffect(() => {
    cb()
  }, deps)
}

export
const useMount = (cb: () => void) => {
  useEffect(() => {
    cb()
  }, [])
}

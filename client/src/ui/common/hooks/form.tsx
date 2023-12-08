import { useState } from 'react'

interface Input_props {
  initial_val?: string
  check_format?: (val: string) => boolean
}

export
const useInput = (props: Input_props = {}) => {
  const [val, set] = useState(props.initial_val)

  return {
    val,
    set,
    reset: () => set(props.initial_val),

    el: <input
      value = {val}
      onChange = {evt => {
        set(evt.currentTarget.value)
      }}
    />
  }
}

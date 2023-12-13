import { useState } from 'react'

interface Input_props {
  initial_val?: string
  type?: string
  check_format?: (val: string) => boolean
}

export
const useInput = (props: Input_props = {}) => {
  const init_val = props.initial_val || ''
  const [val, set] = useState(init_val)

  return {
    val,
    set,
    reset: () => set(init_val),

    el: <input
      value = {val}
      type = {props.type}
      onChange = {evt => {
        set(evt.currentTarget.value)
      }}
    />
  }
}

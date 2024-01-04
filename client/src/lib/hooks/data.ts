import { useState } from 'react'
import { useFlag, useWatch } from '.'

interface useData_props<Data> {
  get: () => Promise<Data> | Data
  default?: Data
  deps?: unknown[]
  initial_loading?: boolean
  skip_when_loading?: boolean
}
interface useData_ret<Data> {
  data: Data | undefined
  loading: boolean
  error: any
  reload: () => void
}

export
const useData = <Data>(props: useData_props<Data>): useData_ret<Data> => {
  const deps = props.deps || []

  const [flag, reload] = useFlag()
  deps.push(flag)

  const [data, set_val] = useState(props.default)
  const [error, set_err] = useState<any>(null)
  const [loading, set_loading] = useState(props.initial_loading ?? true)

  useWatch(
    deps,
    async () => {
      try {
        if (loading && props.skip_when_loading)
          return

        set_loading(true)
        const data = await props.get()
        set_val(data)
        set_err(null)
      } catch(err) {
        console.error('error on useData', err)
        set_err(err)
      }
      set_loading(false)
    }
  )
  return {
    data, error, loading, reload,
  }
}

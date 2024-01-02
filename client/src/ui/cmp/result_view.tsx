import { FC } from 'react'
import { Loading } from './loading'

interface Props<Data, Error> {
  loading: boolean
  error?: Error
  data?: Data

  Loading?: FC
  Error?: FC<{ error: Error}>
  Data: FC<{ data: Data}>
}

export
function Result_view<Data, Error>(props: Props<Data, Error>) {
  const Ld = props.Loading || Loading
  const Err = props.Error || (
    err => <div style = {{ color: 'red' }}>Error: {String(err)}</div>
  )

  if (props.loading)
    return <Ld />
  if (props.error)
    return <Err error = {props.error} />
  if (props.data)
    return <props.Data data = {props.data} />
  throw Error('no error and no data')
}

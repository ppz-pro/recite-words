import { FC } from 'react'

import { useData_history, History_record, drop_history } from '../../ss/history'
import { Link } from 'wouter'
import { Result_view } from './result_view'

export
const History: FC = () => {
  const { data, error, loading, reload } = useData_history()
  return <Result_view<History_record[], any>
    data = {data}
    error = {error}
    loading = {loading}

    Data = {({ data }) =>
      <ul>
        {data.map(record =>
          <li key = {record.id}>
            <Link href = {'/?word=' + record.word}>{record.word}</Link>
            <button
              onClick = {async () => {
                await drop_history(record.id)
                reload()
              }}
            >x</button>
          </li>
        )}
      </ul>
    }
  />
}

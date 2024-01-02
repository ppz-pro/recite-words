import { FC } from 'react'

import { Layout } from '../../cmp/layout'
import { useData_history, History_record } from '../../../ss/history'
import { Link } from 'wouter'
import { Result_view } from '../../cmp/result_view'

export
const History_page: FC = () => {
  const { data, error, loading } = useData_history()
  return <Layout login_required>
    <Result_view<History_record[], any>
      data = {data}
      error = {error}
      loading = {loading}

      Data = {({ data }) =>
        <ul>
          {data.map(record =>
            <li key = {record._id}>
              <Link href = {'/?word=' + record.word}>{record.word}</Link>
            </li>
          )}
        </ul>
      }
    />
  </Layout>
}

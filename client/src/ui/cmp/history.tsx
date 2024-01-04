import { FC } from 'react'
import { css } from '@emotion/react'
import { chunksOf } from 'fp-ts/Array'

import { useData_history, History_record, drop_history } from '../../ss/history'
import { Result_view } from './result_view'
import { useSet_lookup_target } from '../../ss/lookup'

export
const History: FC = () => {
  const { data, error, loading, reload } = useData_history()
  return <Result_view<History_record[], any>
    data = {data}
    error = {error}
    loading = {loading}

    Data = {({ data }) =>
      chunksOf(2)(data).map(([record1, record2], index) =>
        <div
          className='grid'
          key={index}
          css={css({
            'div:not(:empty)': {
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 calc(var(--spacing) /2)',
              borderBottom: '1px solid var(--table-border-color)',
              a: {
                padding: 'calc(var(--spacing) /2)',
                display: 'inline-block',
              },
            }
          })}
        >
          <Item record = {record1} reload = {reload}/>
          {record2
            ? <Item record = {record2} reload = {reload} />
            : <div />
          }
        </div>
      )
    }
  />
}

interface Item_props {
  record: History_record
  reload: () => void
}
const Item: FC<Item_props> = ({ reload, record }) => {
  const set_lookup_target = useSet_lookup_target()
  return <div>
    <a
      href = '#'
      onClick = {() => {
        set_lookup_target(() => record.word)
      }}
    >{record.word}</a>

    <span>
      <a
        href = '#'
        className = 'secondary'
        onClick = {async () => {
          await drop_history(record.id)
          reload()
        }}
      >+</a>
      <a
        href = '#'
        className = 'secondary'
        onClick = {async () => {
          await drop_history(record.id)
          reload()
        }}
      >x</a>
    </span>
  </div>
}

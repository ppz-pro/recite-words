import { FC } from 'react'
import { css } from '@emotion/react'
import { Paraphrase } from '../../../../../server/common/types'
import { useVal_theme } from '../../../ss/theme'

interface Props {
  val: Paraphrase
}

export
const Paraphrase_card: FC<Props> = ({ val }) => {
  const theme = useVal_theme()
  return <div css = {css({
    // backgroundColor: theme.color.fore(.1),
    borderRadius: theme.size(.25),
    padding: theme.xy(1, 2),
    marginTop: theme.size(),
    border: theme.border(.06),
  })}>
    <table>
      <tbody
        css = {css({
          th: {
            textAlign: 'left',
            fontWeight: 'normal',
            color: theme.color.fore(.66),
            paddingRight: theme.size(),
          }
        })}
      >
        <tr>
          <th>headword</th>
          <td>{val.hwi.hw}</td>
        </tr>
        <tr>
          <th>functional label</th>
          <td>{val.fl}</td>
        </tr>
      </tbody>
    </table>

    <ul>
      {val.shortdef.map(item => <li key = {item}>{item}</li>)}
    </ul>
  </div>
}

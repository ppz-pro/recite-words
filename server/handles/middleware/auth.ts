import { Err_code } from '../../err_code.ts'
import { res_error } from '../../lib/utils/index.ts'

export
const check_session: Middleware<string> = (handle) =>
  async (props) => {
    const token = props.req.headers.get('Token')
    if (token === null)
      return res_error(Err_code.NO_TOKEN)
    
    const token_record = await props.models.user_token.get(token)
    if (token_record === null)
      return res_error(Err_code.TOKEN_EXPIRED)

    await props.models.user_token.set(token, token_record, {
      expireIn: props.app.options.session_timeout,
    })
    return handle(props, token_record.username)
  }
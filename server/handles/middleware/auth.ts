import { res_error, Middleware } from '../../deps/simple_web_framework/mod.ts'

import { Err_code } from '../../common/err_code.ts'
import { Req_ctx } from '../../types.ts'

export
const check_session: Middleware<Req_ctx, string> = (handle) =>
  async (ctx: Req_ctx) => {
    const token = ctx.req.headers.get('Token')
    if (token === null)
      return res_error(Err_code.NO_TOKEN)
    
    const token_record = await ctx.models.user_token.get(token)
    if (token_record === null)
      return res_error(Err_code.TOKEN_EXPIRED)

    await ctx.models.user_token.set(token, token_record, {
      expireIn: ctx.app.options.session_timeout,
    })
    return handle(ctx, token_record.username)
  }

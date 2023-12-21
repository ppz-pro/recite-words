import {
  Route,
  check_str,
  retrieve_body,
  res_error,
  res_success,
} from '../deps/simple_web_framework/mod.ts'
import { all_true } from '../deps/fns/index.ts'

import { Req_ctx } from '../types.ts'
import { Err_code } from '../common/err_code.ts'
import { check_session } from './middleware/auth.ts'

export
const logout_route: Route<Req_ctx> = {
  method: 'POST',
  path: '/logout',
  handle: check_session(async ({ req, models }) => {
    const token = req.headers.get('Token') as string
    console.log(`user logouting, token: ${token}`)
    await models.user_token.del(token)
    return res_success()
  }),
}

interface Login_body {
  username: string
  password: string
}

export
const login_route: Route<Req_ctx> = {
  method: 'POST',
  path: '/login',
  handle: async ({ req, app, models }) => {
    const boe = await retrieve_body<Login_body>(req,
      (body) => all_true(
        check_str(body.username),
        check_str(body.password),
      )
    )
    const user = await models.user.one(user =>
      user.username == boe.username
      && user.password == boe.password
    )
    if (!user) {
      console.log(`user login failed [${boe.username}]`)
      return res_error(Err_code.WRONG_USERNAME_OR_PASSWORD)
    }
    const token = crypto.randomUUID()
    console.log(`user login success [${boe.username}, ${token}]`)
    await models.user_token.set(
      token,
      { user_ID: user._id },
      { expireIn: app.options.session_timeout },
    )
    return res_success(token)
  },
}

import { all_true } from '../lib/utils/index.ts'
import { check_str } from '../lib/type/index.ts'
import { Err_code } from '../err_code.ts'
import { res_error, res_success } from '../lib/utils/http.ts'
import { check_session } from './middleware/auth.ts'

/** @type {Route} */
export
const logout_route = {
  method: 'POST',
  path: '/logout',
  handle: check_session(async ({ req, models }) => {
    const token = req.headers.get('Token')
    await models.user_token.del(token)
    return res_success()
  }),
}

/** @type {Route} */
export
const login_route = {
  method: 'POST',
  path: '/login',
  handle: async ({ req, app, models }) => {
    const boe = await retrieve_body(req, (body) => // 这里 body 最好加个括号，否则 req 像是 check 的参数
      all_true(
        check_str(body.username),
        check_str(body.password),
      )
    )
    if (boe instanceof Response)
      return boe
    else {
      const user = await models.user.get(boe.username)
      if (!user || user.password !== boe.password) {
        console.log(`user login failed [${boe.username}]`)
        return res_error(Err_code.WRONG_USERNAME_OR_PASSWORD)
      }
      console.log(`user login success [${boe.username}]`)
      const token = crypto.randomUUID()
      await models.user_token.set(
        token,
        { username: boe.username },
        { expireIn: app.options.session_timeout },
      )
      return res_success(token)
    }
  },
}

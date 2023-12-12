import { all_true } from '../lib/utils/index.ts'
import { check_str } from '../lib/type/index.ts'
import { res_err } from '../lib/response_helper/index.ts'
import { Err_code } from '../err_code.ts'
import { res_error, res_success } from '../lib/utils/http.ts'

interface Login_body {
  username: string
  password: string
}

const get_body = async (req: Request) => {
  const body = await req.json()
  if (all_true(
    check_str(body.username),
    check_str(body.password),
  ))
    return body as Login_body
  else
    return res_err.bad_req()
}

export
const login_route: Route = {
  method: 'GET',
  path: '/login',
  handle: async ({ req, app }) => {
    const boe = await get_body(req) // body or error
    if (boe instanceof Response)
      return boe
    else {
      const user = await app.models.user.get(boe.username)
      if (!user || user.password !== boe.password)
        return res_error(Err_code.WRONG_USERNAME_OR_PASSWORD)
      return res_success()
    }
  },
}
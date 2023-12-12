import { all_true } from '../lib/utils/index.ts'
import { check_str } from '../lib/type/index.ts'
import { res_err } from '../lib/response_helper/index.ts'

interface Login_body {
  username: string
  password: string
}

const check_req_body: Middleware<Login_body> = (handle: Handle<Login_body>) =>
  async (props: Handle_props<Login_body>) => {
    const body = await props.req.json()
    if (all_true(
      check_str(body.username),
      check_str(body.password),
    ))
      return handle(props)
    else
      return res_err.bad_req()
  }

export
const login: Route<Login_body> = {
  method: 'get',
  path: '/login',
  handle: check_req_body(async ({ body }) => {
    return new Response()
  }),
}
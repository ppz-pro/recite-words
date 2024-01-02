import { Route } from '../deps/simple_web_framework/mod.ts'
import { Req_ctx } from '../types.ts'
import { check_session } from './middleware/auth.ts'
import { res_success } from '../deps/simple_web_framework/mod.ts'

export
const history_route: Route<Req_ctx> = {
  path: '/history',
  handle: check_session(async ({ models }) => {
    return res_success(await models.history.all())
  })
}

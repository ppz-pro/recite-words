import { Route, res_err } from '../deps/simple_web_framework/mod.ts'
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

export
const history_del_route: Route<Req_ctx> = {
  method: 'DELETE',
  path: '/history',
  handle: check_session(async ({ models, params }) => {
    const id = params.get('id')
    if (id === null)
      return res_err.bad_req()
    return res_success(await models.history.del(id))
  })
}

import { check_str } from '../deps/simple_web_framework/aajv/index.ts'
import { Route } from '../deps/simple_web_framework/router/types.ts'
import { res_success, res_error } from '../deps/simple_web_framework/respond/index.ts'

import { Err_code } from '../common/err_code.ts'
import { Req_ctx } from '../types.ts'
import { check_session } from './middleware/auth.ts'

export
const look_up_route: Route<Req_ctx> = {
  method: 'GET',
  path: '/lookup',
  handle: check_session(async ({ url }, username) => {
    const word = url.searchParams.get('word')
    console.log(`${username} is looking up ${word}`)
    if (check_str(word)) {
      const res = await fetch('https://lookup.deno.dev/lookup/learners?word=' + word) 
      return res_success(await res.json())
    } else {
      console.error(`error on lookup word [${word}], no word`)
      return res_error(Err_code.UNKNOWN)
    }
  })
}

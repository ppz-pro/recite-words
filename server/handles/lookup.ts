import { get_str } from '../deps/simple_web_framework/aajv/mod.ts'
import { Route } from '../deps/simple_web_framework/router/types.ts'
import { res_success, res_err, res_error } from '../deps/simple_web_framework/respond/mod.ts'

import { Err_code } from '../common/err_code.ts'
import { Req_ctx } from '../types.ts'
import { check_session } from './middleware/auth.ts'

export
const look_up_route: Route<Req_ctx> = {
  method: 'GET',
  path: '/lookup',
  handle: check_session(async ({ url, app }, username) => {
    let word: string | null | boolean = url.searchParams.get('word')
    console.log(`${username} is looking up ${word}`)
    if ((word = get_str(word)) !== false) {
      const result = await (
        await fetch('https://lookup.deno.dev/lookup/learners?word=' + word) 
      ).json()
      if (result.length == 0)
        return res_error(Err_code.NO_PARAPHRASE) // 上层用户输入有问题，或，下层服务有问题
      else if (typeof result[0] == 'string')
        return res_error(Err_code.WRONG_WORD) // 同上
      else {
        await app.models.history.add({ word })
        return res_success(result)
      }
    } else {
      console.error(`error on lookup word [${word}], no word`)
      return res_err.bad_req() // “客户端未校验就发过来 => 客户端要改进” => 判定为 bad request
    }
  })
}

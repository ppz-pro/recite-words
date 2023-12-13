import { Err_code } from '../err_code.ts';
import { check_str } from '../lib/type/index.ts'
import { res_success, res_error } from '../lib/utils/http.ts'

export
const look_up_route: Route = {
  method: 'GET',
  path: '/lookup',
  handle: async ({ url }) => {
    const word = url.searchParams.get('word')
    if (check_str(word)) {
      const res = await fetch('https://lookup.deno.dev/lookup/learners?word=' + word) 
      return res_success(await res.json())
    } else {
      console.error(`error on lookup word [${word}], no word`)
      return res_error(Err_code.UNKNOWN)
    }
  }
}

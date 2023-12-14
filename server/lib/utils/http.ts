import { Err_code } from '../../err_code.ts'
import { res_err } from '../response_helper/index.ts'

export
const retrieve_body = async (req: Request, check: (body: unknown) => unknown) => {
  try {
    const body = await req.json()
    if (check(body))
      return body
    else
      throw Error('body of request unvalidated')
  } catch(err) {
    console.error(req.method, req.url)
    console.error(err)
    return res_err.bad_req()
  }
}

interface JSON_data {
  code: Err_code,
  data: unknown,
}

const res_json = (data: JSON_data) =>
  new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  })

export
const res_success = (data: unknown = null) =>
  res_json({
    data,
    code: Err_code.SUCCESS,
  })

export
const res_error = (code: Err_code) =>
  res_json({
    code,
    data: null,
  })

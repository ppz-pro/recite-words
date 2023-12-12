import { Err_code } from '../../err_code.ts'

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

export * from './error.ts'

export
const res_err = {
  not_found: () =>
    new Response(`not found`, { status: 404 }),
  bad_req: () => // 格式不正确的，应由前端拦截并告知用户（到这里还不正确的，就判定为前端有 bug）
    new Response(`bad request`, { status: 400 }),
  unknown: () =>
    new Response(`unknown error`, { status: 500 }),
}

interface JSON_data {
  code: number
  data: unknown
}

const res_json = (data: JSON_data) =>
  new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json',
    },
  })

export
const res_success = (data: unknown = null) =>
  res_json({
    data,
    code: 0,
  })

export
const res_error = (code: number) =>
  res_json({
    code,
    data: null,
  })
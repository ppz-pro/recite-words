import { Err_code } from '../../../server/common/err_code'
import { empty_token } from './auth'

export
const http = new Proxy({}, {
  get(_, method) {
    return async (url, data, headers) => {
      url = '/api' + url
      if (method == 'GET') {
        url += query_str(data)
        data = undefined
      }
      const res = await fetch(url, {
        method,
        body: data && JSON.stringify(data),
        headers,
      })
      const res_body = await res.json()
      switch (res_body.code) {
        case Err_code.SUCCESS:
          return res_body.data
        case Err_code.TOKEN_EXPIRED:
          console.error('token expired')
          empty_token()
          throw Error(`Token Expired`)
        default:
          if (res_body.code === Err_code.UNKNOWN)
            throw new Error(`unknown error code: ${res_body.code}`)
      }
      throw new HTTP_err(res_body.code)
    }
  }
})

export
class HTTP_err extends Error {
  constructor(code) {
    super(`http error from server, code: ${code}`)
    this.code = code
  }
}

const query_str = query => {
  let result = ''
  for (const k in query)
    result += `&${k}=${query[k]}`
  return '?' + result.slice(1)
}

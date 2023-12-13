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
      if (res_body.code == 0)
        return res_body.data
      else
        throw new HTTP_err(res_body.code)
    }
  }
})

export
class HTTP_err extends Error {
  constructor(code) {
    super('http error from server')
    this.code = code
  }
}

const query_str = query => {
  let result = ''
  for (const k in query)
    result += `&${k}=${query[k]}`
  return '?' + result.slice(1)
}

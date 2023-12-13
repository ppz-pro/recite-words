type request = (url: string, data: unknown, headers?: Headers) => unknown

interface http {
  GET: request
  POST: request
}

export
const http: http


export
class HTTP_err extends Error {
  public code: number
  constructor(code: number)
}

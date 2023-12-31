type request = (url: string, data: unknown, headers?: unknown) => unknown

interface http {
  GET: request
  POST: request
  DELETE: request
}

export
const http: http

export
class HTTP_err extends Error {
  public code: number
  constructor(code: number)
}

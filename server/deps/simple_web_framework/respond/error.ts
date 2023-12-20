export
class Known_error extends Error {
  public code: number
  constructor(msg: string, code: number) {
    super(`known error, ${msg}`)
    this.code = code
  }
}

export
class Bad_req extends Known_error {
  constructor(msg: string, code: number) {
    super('bad request: ' + msg, code)
  }
}

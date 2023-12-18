export
class Known_error extends Error {
  constructor(msg: string) {
    super(`known error, ${msg}`)
  }
}

export
class Bad_req extends Known_error {
  constructor(msg: string) {
    super('bad request: ' + msg)
  }
}

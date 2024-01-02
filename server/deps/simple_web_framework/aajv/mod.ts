// another ajv
import { res_err } from '../respond/mod.ts'

export
const check_str = (obj: unknown, allow_empty = false) =>
  typeof obj == 'string' && (
    allow_empty ? true : obj.length > 0
  )

export
const get_str = (obj: unknown, allow_empty = false): false | string => {
  if (typeof obj == 'string') {
    if (allow_empty)
      return obj.length > 0 && obj
    else
      return obj
  } else
    return false
}

export
const retrieve_body = async <Body>(req: Request, check: (body: any) => boolean): Promise<Body> => {
  try {
    const body = await req.json()
    if (check(body))
      return body as Body
    else
      throw res_err.bad_req()
  } catch {
    throw res_err.bad_req()
  }
}

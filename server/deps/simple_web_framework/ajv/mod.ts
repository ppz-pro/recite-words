import Ajv, { JSONSchemaType } from 'npm:ajv@8'
import { res_err } from '../mod.ts'

const ajv = new Ajv.default()

export
function make_validate<T>(schema: JSONSchemaType<T>) {
  const validate = ajv.compile(schema)
  return (data: unknown): false | T =>
    validate(data) ? data : false
}

export
const make_retrieve_json = <T>(schema: JSONSchemaType<T>) => {
  const validate = make_validate(schema)
  return async (req: Request): Promise<T> => {
    const data = await req.json()
    if (validate(data) === false)
      throw res_err.bad_req()
    else
      return data as T
  }
}

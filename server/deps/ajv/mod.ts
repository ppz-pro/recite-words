import Ajv, { JSONSchemaType } from 'npm:ajv@8'

const ajv = new Ajv.default()

export
function make_validate<T>(schema: JSONSchemaType<T>) {
  return ajv.compile(schema)
}

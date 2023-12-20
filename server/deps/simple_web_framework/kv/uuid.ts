import { Collection } from './collection.ts'
import { I_record, KV_setter_options, Record_data } from './types.ts'

export
class Collection_UUID<Record extends I_record> extends Collection<Record> {
  async add(data: Record_data<Record>, options?: KV_setter_options): Promise<string> {
    const uuid = crypto.randomUUID()
    await super.set(uuid, data, options)
    return uuid
  }
}

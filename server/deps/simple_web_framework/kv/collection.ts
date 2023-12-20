import { Collection, I_record, Record_data, KV_setter_options } from './types.ts'

export
class Collection_impl<Record extends I_record> implements Collection<Record> {
  constructor(
    private kv: Deno.Kv,
    private name: string,
  ) {}

  private k(key: string) {
    return [this.name, key]
  }

  async get(key: string) {
    const entry = await this.kv.get<Record>(this.k(key))
    return entry.value
  }

  async set(key: string, data: Record_data<Record>, options?: KV_setter_options) {
    const record = {
      _id: key,
      ...data,
    }
    console.debug('setting kv', this.k(key), record, options)
    await this.kv.set(this.k(key), record, options)
  }

  async del(key: string) {
    await this.kv.delete(this.k(key))
  }

  async all() {
    const res = this.kv.list<Record>({
      prefix: [this.name]
    })

    const list: Deno.KvEntry<Record>[] = []
    for await (const item of res)
      list.push(item)

    return list.map(entry => entry.value)
  }
}

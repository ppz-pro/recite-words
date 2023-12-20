import { I_collection, I_record, Record_data, KV_setter_options } from './types.ts'

export
class Collection<Record extends I_record> implements I_collection<Record> {
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

  async all(filter?: (record: Record) => boolean) {
    const res = this.kv.list<Record>({
      prefix: [this.name]
    })

    const list: Deno.KvEntry<Record>[] = []
    for await (const item of res)
      list.push(item)

    const result = list.map(entry => entry.value)
    return filter ? result.filter(filter) : result
  }

  async one(find: (record: Record) => boolean): Promise<Record | null> {
    return (await this.all(find))[0] || null
  }
}

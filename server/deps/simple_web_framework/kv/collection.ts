import { I_collection, I_record, Record_data, KV_setter_options } from './types.ts'

export
class Collection<Record extends I_record> implements I_collection<Record> {
  constructor(
    private kv: Deno.Kv,
    private name: string,
  ) {}

  private k(id: string) {
    return [this.name, id]
  }

  /** retrieve a record by id */
  async get(id: string) {
    const entry = await this.kv.get<Record>(this.k(id))
    return entry.value
  }

  private async _set(record: Record, options?: KV_setter_options) {
    await this.kv.set(this.k(record.id), record, options)
  }

  /** update the record */
  async set(record: Record, options?: KV_setter_options) {
    record.updated_at = new Date()
    await this._set(record, options)
  }

  /** insert a new record */
  async add(data: Record_data<Record>, options?: KV_setter_options): Promise<string> {
    const uuid = crypto.randomUUID()
    const now = new Date()
    await this._set(
      {
        id: uuid,
        created_at: now,
        updated_at: now,
        ...data,
      } as Record, // 这里似乎是 ts 的 bug?
      options,
    )
    return uuid
  }

  /** delete one record */
  async del(key: string) {
    await this.kv.delete(this.k(key))
  }

  /** retrieve all records */
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

  /** retrieve one record */
  async one(find: (record: Record) => boolean): Promise<Record | null> {
    return (await this.all(find))[0] || null
  }
}

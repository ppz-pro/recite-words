export
class Collection_impl<Record extends Collection_record> implements Collection<Record> {
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

  async set(key: string, record: Record): Promise<void> {
    record._id = key
    await this.kv.set(this.k(key), record)
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

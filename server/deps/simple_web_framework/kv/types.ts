export
interface KV_setter_options {
  expireIn?: number
}

export
interface Collection_record {
  _id?: string
}

export
interface Collection<Record extends Collection_record> {
  get(key: string): Promise<Record | null>
  all(): Promise<Record[]>
  set(key: string, record: Record, options?: KV_setter_options): Promise<void>
  del(key: string): Promise<void>
}

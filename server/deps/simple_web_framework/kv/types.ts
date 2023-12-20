export
interface KV_setter_options {
  expireIn?: number
}

export
interface I_record {
  _id: string
}
export
type Record_data<Record extends I_record> = Omit<Record, '_id'>

export
interface Collection<Record extends I_record> {
  get(key: string): Promise<Record | null>
  all(): Promise<Record[]>
  set(key: string, record: Record_data<Record>, options?: KV_setter_options): Promise<void>
  del(key: string): Promise<void>
}

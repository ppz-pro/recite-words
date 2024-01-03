export
interface KV_setter_options {
  expireIn?: number
}

export
interface I_record {
  id: string
  created_at: Date
  updated_at: Date
}
export
type Record_data<Record extends I_record> = Omit<Record, 'id' | 'created_at' | 'updated_at'>

export
interface I_collection<Record extends I_record> {
  get(id: string): Promise<Record | null>
  all(filter?: (record: Record) => boolean): Promise<Record[]>
  one(find: (record: Record) => boolean): Promise<Record | null>
  set(record: Record, options?: KV_setter_options): Promise<void>
  add(data: Record_data<Record>, options?: KV_setter_options): Promise<string>
  del(id: string): Promise<void>
}

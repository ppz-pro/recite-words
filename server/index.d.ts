// common
type Wait<Data> = Data | Promise<Data>

interface Collection_record {
  _id?: string
}

declare interface Collection<Record extends Collection_record> {
  get(key: string): Wait<Record | null>
  all(): Wait<Record[]>
  set(key: string, record: Record, options?: KV_setter_options): Promise<void>
  del(key: string): Promise<void>
}

declare interface KV_setter_options {
  expireIn?: number
}

// global
declare interface User_record extends Collection_record {
  password: string
}
declare interface User_token_record extends Collection_record {
  username: string
}

interface Models {
  user: Collection<User_record>
  user_token: Collection<User_token_record>
}

declare interface App {
  options: {
    db_path: string | undefined
    session_timeout: number
  },
  models: Models
}

// request
declare interface Handle_props {
  req: Request
  app: App
  models: Models
  url: URL
}

type Handle = (props: Handle_props) => Wait<Response>

type Middleware<Injected = void> = (handle: (props: Handle_props, injected: Injected) => ReturnType<Handle>) => Handle

type Req_method = 'GET' | 'POST'

declare interface Route {
  method: Req_method
  path: string
  handle: Handle
}

// common
type Wait<Data> = Data | Promise<Data>

interface Collection_record {
  _id?: string
}

declare interface Collection<Record extends Collection_record> {
  get(key: string): Wait<Record | null>
  all(): Wait<Record[]>
  set(key: string, record: Record): Promise<void>
}

// global
declare interface User_record extends Collection_record {
  password: string
}

declare interface App {
  models: {
    user: Collection<User_record>
  }
}

// request
declare interface Handle_props {
  req: Request
  app: App
  url: URL
}

type Handle = (props: Handle_props) => Wait<Response>

type Middleware = (handle: Handle) => Handle

type Req_method = 'GET' | 'POST'

declare interface Route {
  method: Req_method
  path: string
  handle: Handle
}

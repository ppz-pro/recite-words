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
declare interface Handle_props<Body> {
  req: Request
  app: App
  url: URL
  body: Body
}

type Handle<Body> = (props: Handle_props<Body>) => Wait<Response>

type Middleware<Body> = (handle: Handle<Body>) => Handle<Body>

declare interface Route<Body = void> {
  method: 'get' | 'post'
  path: string
  handle: Handle<Body>
}

import { Wait } from '../../type_utils.ts'

export
interface Context {
  req: Request
  url: URL
}

export
type Handle<Ctx extends Context> = (ctx: Ctx) => Wait<Response>

export
type Middleware<Ctx extends Context, Injected = void> =
(handle: (ctx: Ctx, injected: Injected) => ReturnType<Handle<Ctx>>)
  => Handle<Ctx>


export
type Req_method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export
interface Route<Ctx extends Context> {
  method: Req_method
  path: string
  handle: Handle<Ctx>
}

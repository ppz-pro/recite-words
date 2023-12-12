import { Router } from './handles/index.ts'
import { res_err } from './lib/response_helper/index.ts';
import { check_static_path, serve_statics } from './serve_statics.ts'
import { Collection_impl } from './lib/kv_helper/collection.ts'

check_static_path()

const app: App = await async function() {
  const kv = await Deno.openKv()
  return {
    models: {
      user: new Collection_impl(kv, 'user'),
    }
  }
}()

const router = Router()

Deno.serve(
  {
    port: 10002,
  },
  async (req: Request): Promise<Response> => {
    const url = new URL(req.url)
    try {
      if (url.pathname.startsWith('/api/')) {
        const handle_api = router(req.method as Req_method, url.pathname)
        if (handle_api)
          return await handle_api({
            url,
            req,
            app,
          })
        else
          return res_err.not_found()
      }
      else
        return await serve_statics(url.pathname)
    } catch(err) {
      console.error(err)
      return new Response('Unknown error', { status: 500 })
    }
  }
)

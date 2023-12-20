import { abs_path, calc } from './deps/fns/index.ts'
import { res_err, Serve_statics, Collection_impl, Collection_UUID } from './deps/simple_web_framework/mod.ts'

import { App } from './types.ts'
import { router } from './handles/index.ts'
import { retrieve_app_config } from './app_config.ts'

const serve_static = Serve_statics({
  dirname: check_static_root(abs_path(import.meta.url, '../client/public')),
  spa: true,
  dir_as_index: true,
})

const app: App = await calc(async()  => {
  const options = retrieve_app_config()
  const kv = await Deno.openKv(options.db_path)
  return {
    options,
    models: {
      user: new Collection_UUID(kv, 'user'),
      user_token: new Collection_impl(kv, 'user_token'),
    }
  }
})

Deno.serve(
  {
    port: 10002,
  },
  async (req: Request) => {
    const url = new URL(req.url)
    try {
      if (url.pathname.startsWith('/api/')) {
        const handle_api = router(req.method, url.pathname.slice(4))
        if (handle_api)
          return await handle_api({
            url,
            req,
            app,
            models: app.models,
          })
        else {
          console.warn('api not found', req.method, url.pathname)
          return res_err.not_found()
        }
      }
      else
        return await serve_static(url.pathname)
    } catch(err) {
      console.error(err)
      return new Response('Unknown error', { status: 500 })
    }
  }
)

function check_static_root(path: string) {
  return path
}
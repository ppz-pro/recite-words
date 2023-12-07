import { handle_api,  } from './handles/index.ts'
import { check_static_path, serve_statics } from './serve_statics.ts'

check_static_path()

Deno.serve(
  {
    port: 10002,
  },
  async (req: Request): Promise<Response> => {
    const url = new URL(req.url)
    try {
      if (url.pathname.startsWith('/api/'))
        return await handle_api(req)
      else
        return await serve_statics(url.pathname)
    } catch(err) {
      console.error(err)
      return new Response('Unknown error', { status: 500 })
    }
  }
)

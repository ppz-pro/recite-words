import { res_err } from '../lib/response_helper/index.ts'

interface Login_body {
  username?: string
  password?: string
}

export
const login: Route = {
  method: 'get',
  path: '/login',
  handle: async ({ req }) => {
    const { username, password } = await req.json() as Login_body
    if (!username || !password)
      // 不应轻易使用异常的 http status，但请求参数应由前端检查，后发给后端，所以这里使用 400
      return res_err.bad_req()
    return new Response()
  }
}
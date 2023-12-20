import { Router } from '../deps/simple_web_framework/mod.ts'

import { Req_ctx } from '../types.ts'
import { login_route, logout_route } from './auth.ts'
import { look_up_route } from './lookup.ts'

export
const router = Router<Req_ctx>([
  login_route,
  logout_route,
  look_up_route,
])

import { login_route, logout_route } from './auth.js'
import { look_up_route } from './lookup.ts'

export
const Router = () => {
  const list: Route[] = [
    login_route,
    logout_route,
    look_up_route,
  ]

  const map: Record<string, Record<string, Handle | undefined> | undefined> = {}
  for(const route of list) {
    const methods = map[route.method] ||= {}
    methods[route.path] = route.handle
  }
  
  return (method: Req_method, path: string) => {
    console.log(`serving api: ${method} ${path}`)
    return map?.[method]?.[path]
  }
}

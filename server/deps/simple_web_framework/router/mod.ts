import { Route, Context, Handle } from './types.ts'

export * from './types.ts'

export
const Router = <Ctx extends Context>(routes: Route<Ctx>[]) => {
  const map: Record<string, Handle<Ctx>> = {}
  for(const route of routes)
    map[route.method + ' ' + route.path] = route.handle
  
  return (method: string, path: string) =>
    map[method + ' ' + path]
}

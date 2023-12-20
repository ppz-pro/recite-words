import { res_err } from '../respond/mod.ts'

interface Static_opts {
  dirname: string
  spa?: boolean
  dir_as_index?: boolean
}

export
const Serve_statics = ({ dirname, spa, dir_as_index }: Static_opts) => {
  const as_index = (path: string) => {
    if (path.at(-1) != '/')
      path += '/'
    return path + 'index.html'
  }

  const res_static = async (path: string) => {
    const file = await Deno.open(path, { read: true })
    return new Response(file.readable)
  }

  const serve_static = async (path: string) => {
    try {
      return await res_static(path)
    } catch {
      return res_err.not_found()
    }
  }

  const serve_root_index = async (err: Error) => {
    if (err instanceof Deno.errors.NotFound)
      return await res_static(dirname + '/index.html') // 都 spa 了，这个 index.html 必须存在（不存在也不应报 404，报个 500 还差不多）
    throw err
  }

  if (spa && dir_as_index) { // 普通单页面应用
    return async (pathname: string) => {
      try {
        const path = dirname + pathname
        const stat = await Deno.stat(path) // throw Deno.errors.NotFound
        if (stat.isDirectory)
          return await res_static(as_index(path)) // return await 保证了“发生异常时，能被下面 catch”
        else // 判定为 file
          return await res_static(path)
      } catch(err) {
        return await serve_root_index(err)
      }
    }
  }
  else if (spa && !dir_as_index) {
    return async (pathname: string) => {
      try {
        return await res_static(dirname + pathname)
      } catch(err) {
        return await serve_root_index(err)
      }
    }
  }
  else if (!spa && dir_as_index) {
    return async (pathname: string) => {
      let path = dirname + pathname
      const stat = await Deno.stat(path)
      if (stat.isDirectory)
        path = as_index(path)
      return serve_static(path)
    }
  }
  else { // !spa && !dir_as_index
    return (pathname: string) =>
      serve_static(dirname + pathname)
  }
}

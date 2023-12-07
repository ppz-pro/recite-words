const relative_path = 'client/public'

/** 检查路径是否正确（以防在不同目录启动项目时，所导致的相对路径异常） */
export
const check_static_path = () => {
  const static_secret = 'yyyyyyyyyyyyyyyes'
  const secret = Deno.readTextFileSync(relative_path + '/' + static_secret)
  if (secret != static_secret)
    throw Error('relative path error. you maybe run the app from not the `run` file at root dir.')
}

export
const serve_statics = async (pathname: string): Promise<Response> => {
  console.log('serving static file', pathname)
  try {
    let path = relative_path + pathname
    let file = await Deno.open(path, { read: true })
    if (file.statSync().isDirectory) { // 路径是一个文件夹时，指向文件夹中的 index.html
      if (path.at(-1) != '/')
        path += '/'
      file = await Deno.open(path + 'index.html', { read: true }) 
    }
    return new Response(file.readable)
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      if (pathname.includes('.')) { // 判定为非页面请求
        console.log(`static file named '${pathname}' is not found`)
        return new Response('Not Found', { status: 404 })
      } else {
        const file = await Deno.open(relative_path + '/index.html')
        return new Response(file.readable)
      }
    } else {
      console.error(`Unknown static file error, pathname: ${pathname}`)
      throw err
    }
  }
}

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
    const file_stat = await Deno.stat(path)
    if (file_stat.isDirectory) { // deno deploy 不支持读文件夹，会报错
      if (path.at(-1) != '/')
        path += '/'
      path += 'index.html' // 对文件夹的请求都转成对文件夹下 index.html 文件的请求
    }
    const file = await Deno.open(path, { read: true })
    return new Response(file.readable)
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      if (pathname.includes('.')) { // 判定为非页面请求
        console.log(`static file named '${pathname}' is not found`)
        return new Response('Not Found', { status: 404 })
      } else { // 如果请求的是页面，则全返回根页面
        const file = await Deno.open(relative_path + '/index.html')
        return new Response(file.readable)
      }
    } else {
      console.error(`Unknown static file error, pathname: ${pathname}`)
      throw err
    }
  }
}

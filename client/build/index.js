const { context } = require('esbuild')

async function main() {
  const ctx = await context({
    entryPoints: ['src/main.tsx'],
    bundle: true,
    outfile: 'public/bundled/index.js',
    sourcemap: true,
    logLevel: 'info',
    
    jsx: 'automatic', // 自动引入 jsx，用于取代 React.createElement（但没说从“哪个包”里引“哪个变量”出来）
    jsxImportSource: '@emotion/react', // 哪个包
    jsxFactory: 'jsx', // 哪个变量
  })

  const mode = process.argv[2]
  switch (mode) {
    case 'DEVELOPMENT':
      console.log('dev mode')
      await ctx.watch()
      break
    case 'PRODUCTION':
      console.log('pro mode')
      await ctx.rebuild()
      ctx.dispose()
      break
    default:
      throw Error(`wrong mode '${mode}'`)
  }
}

main()

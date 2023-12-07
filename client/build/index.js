const { context } = require('esbuild')

async function main() {
  const ctx = await context({
    entryPoints: ['src/index.jsx'],
    bundle: true,
    outfile: 'public/bundled/index.js',
    sourcemap: true,
    logLevel: 'info',
    
    jsx: 'automatic', // 自动引入 jsx，用于取代 React.createElement（但没说从“哪个包”里引“哪个变量”出来）
    jsxImportSource: '@emotion/react', // 哪个包
    jsxFactory: 'jsx', // 哪个变量
  })

  await ctx.watch()
}

main()

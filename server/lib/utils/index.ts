import { join } from '../../deps/path.ts'

export
const all_true = (...arr: boolean[]) => arr.every(item => item)

export
const abs_path = (url: string, relative_path: string) =>
  join(new URL('.', url).pathname, relative_path) // URL 的第一个参数参考这里：https://developer.mozilla.org/en-US/docs/Web/API/URL#usage_notes

export * from './utils.js'
export * from './http.ts'
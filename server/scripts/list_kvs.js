import { retrieve_app_config } from '../app_config.ts'

try {
  const kv = await Deno.openKv(retrieve_app_config().db_path)
  const res = kv.list({ prefix: [] })

  for await (const kv of res)
    console.log(kv)
} catch(err) {
  console.error(err)
}

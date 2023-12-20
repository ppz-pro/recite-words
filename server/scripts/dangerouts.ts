// !!!!!!!!!!!!!!!!!!!!
// dangerous! DELETE ALL DATA!
// deno run -A --unstable ./scripts/dangerouts.ts

import { retrieve_app_config } from '../app_config.ts'

const kv = await Deno.openKv(retrieve_app_config().db_path)
const iter = await kv.list({ prefix: [] })

for await (const entry of iter) {
  console.log('deleting', entry)
  await kv.delete(entry.key)
  console.log('deleted')
}

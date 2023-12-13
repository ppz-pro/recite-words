// deno run -A --unstable ./server/scripts/playground.ts

import { retrieve_app_config } from '../app_config.ts'

const kv = await Deno.openKv(retrieve_app_config().db_path)

console.log(await kv.get(['user', 'ppz']))
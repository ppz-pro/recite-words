// deno run --unstable --allow-read --allow-env --allow-write ./server/scripts/add_user.ts

import { Collection_impl } from '../lib/kv_helper/collection.ts'
import { retrieve_app_config } from '../app_config.ts'

const username = 'ppz'
const password = '0523'

try {
  const kv = await Deno.openKv(retrieve_app_config().db_path)
  const user_coll = new Collection_impl<User_record>(kv, 'user')

  await user_coll.set(username, {
    password,
  })
} catch(err) {
  console.error(err)
}

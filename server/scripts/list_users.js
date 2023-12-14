import { Collection_impl } from '../lib/kv_helper/collection.ts'
import { retrieve_app_config } from '../app_config.ts'

try {
  const kv = await Deno.openKv(retrieve_app_config().db_path)
  const user_coll = new Collection_impl(kv, 'user')
  console.log(await user_coll.all())
} catch(err) {
  console.error(err)
}

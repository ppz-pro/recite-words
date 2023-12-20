import { Collection } from '../deps/simple_web_framework/kv/collection.ts'
import { retrieve_app_config } from '../app_config.ts'

try {
  const kv = await Deno.openKv(retrieve_app_config().db_path)
  const user_coll = new Collection(kv, 'user')
  console.log(await user_coll.all())
} catch(err) {
  console.error(err)
}

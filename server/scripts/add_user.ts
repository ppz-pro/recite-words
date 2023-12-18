import { Collection_impl } from '../deps/simple_web_framework/kv/collection.ts'
import { retrieve_app_config } from '../app_config.ts'

const username = ''
const password = ''

try {
  const kv = await Deno.openKv(retrieve_app_config().db_path)
  const user_coll = new Collection_impl<User_record>(kv, 'user')

  await user_coll.set(username, {
    password,
  })
} catch(err) {
  console.error(err)
}

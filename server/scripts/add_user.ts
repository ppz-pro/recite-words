import { Collection_UUID } from '../deps/simple_web_framework/mod.ts'
import { retrieve_app_config } from '../app_config.ts'
import { User_record } from '../types.ts'

// 用户名密码不要提交 git
// const username = ''
// const password = ''

try {
  const kv = await Deno.openKv(retrieve_app_config().db_path)
  const user_coll = new Collection_UUID<User_record>(kv, 'user')

  await user_coll.add({
    username,
    password,
  })
} catch(err) {
  console.error(err)
}

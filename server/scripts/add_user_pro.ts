import { Collection } from '../deps/simple_web_framework/kv/collection.ts'

const username = ''
const password = ''

try {
  const uuid = Deno.env.get('RECITE_WORD_KV_UUID')
  const access_token = Deno.env.get('DENO_KV_ACCESS_TOKEN')
  console.log({ uuid, access_token })
  const kv = await Deno.openKv(`https://api.deno.com/databases/${uuid}/connect`)
  const user_coll = new Collection<User_record>(kv, 'user')

  await user_coll.set(username, {
    password,
  })
} catch(err) {
  console.error(err)
}

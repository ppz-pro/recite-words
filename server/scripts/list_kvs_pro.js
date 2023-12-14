try {
  const uuid = Deno.env.get('RECITE_WORD_KV_UUID')
  const access_token = Deno.env.get('DENO_KV_ACCESS_TOKEN')
  console.log({ uuid, access_token })
  const kv = await Deno.openKv(`https://api.deno.com/databases/${uuid}/connect`)
  const res = kv.list({ prefix: [] })

  for await (const kv of res)
    console.log(kv)
} catch(err) {
  console.error(err)
}

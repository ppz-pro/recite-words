try {
  const uuid = Deno.env.get('RECITE_WORD_KV_UUID')
  const access_token = Deno.env.get('DENO_KV_ACCESS_TOKEN')
  console.log({ uuid, access_token })
  const kv = await Deno.openKv(`https://api.deno.com/databases/${uuid}/connect`)
  const res = kv.list({ prefix: [] })

  for await (const entry of res)
    console.log(entry)
} catch(err) {
  console.error(err)
}

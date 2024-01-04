import { Route, res_success } from '../deps/simple_web_framework/mod.ts'
import { make_retrieve_json } from '../deps/simple_web_framework/ajv/mod.ts'

import { Req_ctx } from '../types.ts'
import { check_session } from './middleware/auth.ts'

interface Body {
  word: string
}

const retrieve_json = make_retrieve_json<Body>({
  type: 'object',
  properties: {
    word: { type: 'string' },
  },
  required: ['word'],
})

export
const vocabulary_route: Route<Req_ctx> = {
  method: 'POST',
  path: '/vocabulary',
  handle: check_session(async ({ models, req }) => {
    const { word } = await retrieve_json(req)
    await models.vocabulary.add({
      word,
      remember: 0,
    })
    return res_success()
  })
}

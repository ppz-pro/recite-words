// env variables => app config

import { abs_path } from './deps/fns/index.ts'

export
const retrieve_app_config = () => {
  const env_mode = Deno.env.get('ENV_MODE')
  let db_path: string | undefined
  switch (env_mode) {
    case 'DEVELOPMENT':
      db_path = abs_path(import.meta.url, '../db/main')
      break
    case 'PRODUCTION':
      break
    default:
      throw Error('no env variable [ENV_MODE] (DEVELOPMENT or PRODUCTION)')
  }

  return {
    db_path,
    session_timeout: .5 * 60 * 60 * 1000,
  }
}

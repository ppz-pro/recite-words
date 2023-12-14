// env variables => app config

export
const retrieve_app_config = () => {
  const env_mode = Deno.env.get('ENV_MODE')
  let db_path: string | undefined
  switch (env_mode) {
    case 'DEVELOPMENT':
      db_path = './db/main'
      break
    case 'PRODUCTION':
      break
    default:
      throw Error('no env variable [ENV_MODE] (DEVELOPMENT or PRODUCTION)')
  }

  return {
    db_path,
    session_timeout: 2 * 60 * 60 * 1000,
  }
}

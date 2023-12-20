import {
  I_record,
  I_collection,
  Collection_UUID,
  Context,
} from './deps/simple_web_framework/mod.ts'

export
interface User_record extends I_record {
  username: string
  password: string
}
export
interface User_token_record extends I_record {
  user_ID: string
}

interface Models {
  user: Collection_UUID<User_record>
  user_token: I_collection<User_token_record>
}

export
interface App {
  options: {
    db_path: string | undefined
    session_timeout: number
  },
  models: Models
}

export
interface Req_ctx extends Context {
  app: App
  models: Models
}

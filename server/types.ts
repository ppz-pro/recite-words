import { Collection_record, Collection } from './deps/simple_web_framework/kv/types.ts'
import { Context } from './deps/simple_web_framework/router/types.ts'

export
interface User_record extends Collection_record {
  password: string
}
export
interface User_token_record extends Collection_record {
  username: string
}

interface Models {
  user: Collection<User_record>
  user_token: Collection<User_token_record>
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

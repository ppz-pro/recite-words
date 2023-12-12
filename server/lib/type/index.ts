export
const check_str = (obj: unknown, allow_empty = false) =>
  typeof obj == 'string' && (
    allow_empty ? true : obj.length > 0
  )

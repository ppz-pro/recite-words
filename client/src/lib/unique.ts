type Format<Type> = (val: Type) => string
const default_format = <Type>(val: Type) => `duplicated unique value [${val}]`

export
const Check_unique = <Type>(
  err_format: Format<Type> = default_format
) => {
  const set = new Set<Type>()
  return (val: Type) => {
    if (set.has(val))
      throw Error(err_format(val))
    set.add(val)
  }
}

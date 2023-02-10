const match = (key, arg) => '-' + key[0] === arg || '--' + key === arg


export default (args, opts) => {
  const [,, ...rest] = args

  let cursor = 0
  const res = {
    _: [],
  }

  while(cursor < rest.length) {
    const arg = rest[cursor]

    if (opts?.flags?.some(flag => match(flag, arg))) {
      res[opts.flags.find(flag => match(flag, arg))] = true
    } else if (opts?.params?.some(param => match(param, arg))) {
      res[opts.params.find(param => match(param, arg))] = rest[++cursor]
    } else {
      res._.push(arg)
    }

    cursor++
  }

  return res
}

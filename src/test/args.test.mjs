import args from '../args.mjs'


describe('args', () => {
  test('parses arguments.', () => {
    const res = args(['node', 'script', 'a', '--flag', 'b', '-p', 'c'], {
      flags: ['flag'],
      params: ['param'],
    })

    expect(res).toEqual({
      _: ['a', 'b'],
      flag: true,
      param: 'c',
    })
  })
})

import pretty from 'pretty-ms'


export default async (task) => {
  const t0 = performance.now()
  await task()
  const t1 = performance.now()

  return pretty(t1 - t0, {
    millisecondsDecimalDigits: 1
  })
}

import sleep from 'sleep-promise'
import time from '../time.mjs'


describe('time', () => {
  test('times given async function', async () => {
    const timeTaken = await time(async () => {
      await sleep(100)
    })

    expect(timeTaken.endsWith('ms')).toBe(true)
    expect(parseInt(timeTaken.substring(0, timeTaken.length - 2), 10)).toBeGreaterThanOrEqual(100)
  })
})

import {test, expect} from 'vitest'
import {thenTansform} from './index.js'

const code = `
1 == 2 || 3 || 4 && 5 < 2
`

test('should', async () => {
  expect(await thenTansform(code)).toBe(
    `1 == 2 || 1 == 3 || 1 == 4 || 1 == 5;1 < 2 && 2 < 3;`
  )
})
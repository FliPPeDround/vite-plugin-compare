import {test, expect} from 'vitest'
import {thenTansform} from './index.js'

const code = `
1 == 2 || 3
`

test('should', async () => {
  expect(await thenTansform(code)).toBe(`1 == 2 || 1 == 3;`)
})
import {test, expect} from 'vitest'
import {thenTansform} from './index'

const code = `
1 < 3 < 2
`

test('should', async () => {
  expect(await thenTansform(code)).toBe(`1 < 3 && 3 < 2;`)
})
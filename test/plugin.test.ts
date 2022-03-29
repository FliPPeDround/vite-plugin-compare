import {test, expect} from 'vitest'
import {thenTansform} from './index'

const code = `
a == 1||2||3
`

test('should', async () => {
  expect(await thenTansform(code)).toBe(`1 < 3 && 3 < 2;`)
})
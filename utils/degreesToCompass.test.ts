import { expect, test } from '@jest/globals'
import { degreesToCompass } from './degreesToCompass'

test('Coverting 135 degrees to compass directions', () => {
  expect(degreesToCompass(135)).toBe('Sydøst')
})
test('Coverting 0 degrees to compass directions', () => {
  expect(degreesToCompass(0)).toBe('Nord')
})

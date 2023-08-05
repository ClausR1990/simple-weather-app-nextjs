import { render, screen, waitFor } from '@testing-library/react'
import { WeatherWidget } from '.'
import { data } from './WeatherWidget.mock'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: () => jest.fn(),
      replace: () => jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
  useSearchParams() {
    return ''
  },
}))

test('WeatherWidget Renders successfully', async () => {
  render(<WeatherWidget data={data} />)
  await waitFor(() => {
    expect(screen.getByText(/spredt skydække/i)).toBeInTheDocument()
  })
})

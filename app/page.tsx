import { WeatherData, WeatherWidget } from '@/components/WeatherWidget'

const getWeatherData = async (cityParam?: string) => {
  const defaultCity = 'copenhagen'
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${
      cityParam?.trim() ?? defaultCity
    }&units=metric&lang=da&appid=${process.env.WEATHERAPP_APIKEY}`,
    {
      next: {
        tags: ['weather'],
      },
    },
  )

  if (!response.ok) {
    // This will activate the closest `error.ts` Error Boundary
    throw new Error(response.statusText)
  }
  const data = await response.json()
  return data as WeatherData
}

type PageProps = {
  params: { slug: string }
  searchParams: { ['city']: string }
}

export default async function Home({ searchParams }: PageProps) {
  const urlParams = searchParams['city']
  const data = await getWeatherData(urlParams ?? null)

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="container">
        <WeatherWidget data={data} />
      </div>
    </main>
  )
}

import dynamic from 'next/dynamic'
import z from 'zod'
import { degreesToCompass } from '@/utils/degreesToCompass'
import Image from 'next/image'
import { SearchBoxServerComponent, Skeleton } from '../SearchBox'

const SearchBox = dynamic(() => import('../SearchBox'), {
  loading: () => <Skeleton />,
  ssr: false,
})

const weather = z.object({
  description: z.string(),
  main: z.string(),
  id: z.number(),
  icon: z.string(),
})

const weatherData = z.object({
  id: z.number(),
  coord: z.object({
    lon: z.number(),
    lat: z.number(),
  }),
  base: z.string(),
  cod: z.number(),
  clouds: z.object({
    all: z.number(),
  }),
  message: z.string().optional(),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number(),
  }),
  visibility: z.number(),
  name: z.string(),
  wind: z.object({
    deg: z.number(),
    speed: z.number(),
  }),
  weather: z.array(weather),
})

export type WeatherData = z.infer<typeof weatherData>

export interface WeatherWidgetProps {
  data: WeatherData
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ data }) => {
  const gradient = data.weather[0].icon.includes('d')
    ? `from-cyan-600 to-cyan-200`
    : `from-slate-900 to-indigo-900`
  return (
    <div className="mx-auto flex w-[800px] max-w-full flex-col items-center justify-center gap-6 text-center md:text-left">
      <div
        className={`bg-gradient-to-b p-8 md:bg-gradient-to-r ${gradient} grid w-full max-w-full grid-cols-1 overflow-hidden rounded-2xl text-2xl capitalize text-white shadow-2xl md:grid-cols-2`}
      >
        <div>
          <h2 className="mb-4 text-xl">{data.weather[0].description}</h2>
          <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:divide-x">
            <div className="text-8xl font-normal sm:pr-4">
              {Math.round(data.main.temp)}
              <span className="font-thin">°</span>
            </div>
            <div className="sm:pl-4">
              {/* <div className="text-xl">{currentDate}</div> */}
              <div className="text-xl font-bold">{data.name}</div>
              <ul className="mt-2 flex gap-2 text-sm">
                <li className="">
                  Luftfugtighed: <b>{data?.main.humidity}</b>
                </li>
                <li className="">
                  Vind:{' '}
                  <b>
                    {Math.round(data?.wind.speed)}{' '}
                    <span className="lowercase">m/s</span>{' '}
                    {data?.wind.deg && degreesToCompass(data?.wind.deg)}
                  </b>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Image
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt=""
          className="right-0 top-0 mx-auto aspect-square md:mx-0 md:ml-auto"
          width={200}
          height={200}
        />
      </div>
      <SearchBox />
      {/**
       * Progressive Enhancement
       * {<SearchBoxServerComponent />} will only render if Javascript is disabled in the browser
       */}
      <noscript className="w-full">
        <SearchBoxServerComponent placeholder="By" buttonLabel="Søg" />
      </noscript>
    </div>
  )
}

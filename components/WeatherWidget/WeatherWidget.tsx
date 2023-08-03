import z from 'zod'
import dayjs from 'dayjs'
import 'dayjs/locale/da'
import { degreesToCompass } from '@/utils/degreesToCompass'
import { SearchBox } from '../SearchBox'

const weather = z.object({
  description: z.string(),
  main: z.string(),
  id: z.number(),
  icon: z.string(),
})

const weatherData = z.object({
  base: z.string(),
  cod: z.number(),
  clouds: z.object({
    all: z.number(),
  }),
  message: z.string(),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number(),
  }),
  name: z.string(),
  wind: z.object({
    deg: z.number(),
    speed: z.number(),
  }),
  weather: z.array(weather),
})

type WeatherData = z.infer<typeof weatherData>

export interface WeatherWidgetProps {
  data: WeatherData
}

const currentDate = dayjs(new Date()).locale('da').format('dddd, D. MMMM')

export const WeatherWidget: React.FC<WeatherWidgetProps> = async ({ data }) => {
  const gradient = data.weather[0].icon.includes('d')
    ? `from-cyan-600 to-cyan-200`
    : `from-slate-900 to-indigo-900`
  return (
    <>
      <div
        className={`p-8 bg-gradient-to-r ${gradient} rounded-2xl shadow-2xl text-white text-2xl w-[800px] max-w-full relative capitalize overflow-hidden`}
      >
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt=""
          className="absolute right-0 top-0 h-full aspect-square"
        />
        <h2 className="mb-4 text-xl">{data.weather[0].description}</h2>
        <div className="flex flex-row divide-x items-center">
          <div className="pr-4 text-8xl font-normal">
            {Math.round(data.main.temp)}
            <span className="font-thin">°</span>
          </div>
          <div className="pl-4">
            <div className="text-xl">{currentDate}</div>
            <div className="text-base font-bold">{data.name}</div>
            <ul className="flex gap-2 text-sm mt-2">
              <li className="">
                Humidity: <b>{data?.main.humidity}</b>
              </li>
              <li className="">
                Wind:{' '}
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
      <SearchBox />
    </>
  )
}

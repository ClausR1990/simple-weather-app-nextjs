import { WeatherData } from '.'

export const data: WeatherData = {
  coord: { lon: 12.5655, lat: 55.6759 },
  weather: [
    {
      id: 803,
      main: 'Clouds',
      description: 'spredt skydække',
      icon: '04d',
    },
  ],
  base: 'stations',
  main: {
    temp: 17.64,
    feels_like: 17.26,
    temp_min: 16.61,
    temp_max: 19.11,
    pressure: 1014,
    humidity: 69,
  },
  visibility: 10000,
  wind: {
    speed: 0.62,
    deg: 349,
    gust: 1.18,
  },
  rain: {
    '1h': 3.16,
  },
  timezone: 7200,
  dt: 1661870592,
  clouds: { all: 75 },
  id: 2618425,
  name: 'København',
  cod: 200,
}

import axios from "axios";
import { IWeatherData } from "../types/weatherData.Type";

export const getWeather = async (
  lat: number,
  lon: number
): Promise<IWeatherData | null> => {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: lat,
          lon: lon,
          units: "metric",
          appid: "e054317e683686e109aa90cb8b17aba6",
        },
      }
    );

    const data = response.data;
    if (data) {
      const weatherData: IWeatherData = {
        coord: {
          lon: data.coord.lon,
          lat: data.coord.lat,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        weather: data.weather.map((item: any) => ({
          id: item.id,
          main: item.main,
          description: item.description,
          icon: item.icon,
        })),
        base: data.base,
        main: {
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          sea_level: data.main.sea_level || 0,
          grnd_level: data.main.grnd_level || 0,
        },
        visibility: data.visibility,
        wind: data.wind
          ? {
              speed: data.wind.speed,
              deg: data.wind.deg,
              gust: data.wind.gust || 0,
            }
          : undefined,
        clouds: {
          all: data.clouds.all,
        },
        dt: data.dt,
        sys: {
          country: data.sys.country,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
        },
        timezone: data.timezone,
        id: data.id,
        name: data.name,
        cod: data.cod,
      };
      return weatherData;
    }
    return null;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};

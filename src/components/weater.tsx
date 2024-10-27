import React, { useEffect, useState } from "react";
import { getLocation } from "../apis/fetchLocation";
import { getWeather } from "../apis/fetchWeather";
import { IWeatherData } from "../types/weatherData.Type";
import { CiLocationOn } from "react-icons/ci";
import { FaTemperatureEmpty } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { MdDisabledVisible, MdSpeed } from "react-icons/md";
import { GiPressureCooker } from "react-icons/gi";

interface WeatherComponentProps {
  country: string;
}

const WeatherApp: React.FC<WeatherComponentProps> = ({ country }) => {
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        const location = await getLocation(country);
        if (!location) {
          setError("Enter your location");
          setLoading(false);
          return;
        }

        const data = await getWeather(location.lat, location.lng);
        if (data) {
          setWeatherData(data);
        } else {
          setError("Weather data not found");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [country]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-10">
      {weatherData && (
        <div  className="flex flex-col justify-center mt-5 bg-gradient-to-l from-slate-800 to-violet-700 text-white rounded-xl py-4 px-6">
            <h2 className="flex gap-x-3 font-bold text-3xl">Weather Information for  {weatherData.name}, {weatherData.sys.country}<CiLocationOn /></h2>
          <div className="flex flex-col items-center justify-center">
            <div>
              <img
                className=""
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                alt={weatherData.weather[0].description}
              />
            </div>
            <div className="flex items-center gap-x-4">
              <FaTemperatureEmpty className="size-16" />
              <p className="text-7xl">{weatherData.main.temp}°C</p>
            </div>
            <div className="flex items-center gap-x-8 mt-10">
                <div className="flex flex-col items-center py-2 px-4 border rounded-lg gap-y-3"><WiHumidity className="size-8" /><p>Humidity: {weatherData.main.humidity}%</p></div>
                <div className="flex flex-col items-center py-2 px-4 border rounded-lg gap-y-3"><MdDisabledVisible className="size-8" /><p>VISIBLITY {weatherData.visibility}</p></div>
                <div className="flex flex-col items-center py-2 px-4 border rounded-lg gap-y-3"><GiPressureCooker className="size-8" /><p>Pressure: {weatherData.main.pressure} hPa</p></div>
                <div className="flex flex-col items-center py-2 px-4 border rounded-lg gap-y-3"><MdSpeed className="size-8" /><p>Wind Speed: {weatherData.wind?.speed} m/s</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

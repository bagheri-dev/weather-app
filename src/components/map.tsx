import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getWeather } from "../apis/fetchWeather";
import { IWeatherData } from "../types/weatherData.Type";
import { CiLocationOn } from "react-icons/ci";
import { FaTemperatureEmpty } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { MdDisabledVisible, MdSpeed } from "react-icons/md";
import { GiPressureCooker } from "react-icons/gi";

const MapComponent: React.FC = () => {
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);

  const handleMapClick = async (lat: number, lon: number) => {
    const data = await getWeather(lat, lon);
    setWeatherData(data);
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: (event) => {
        handleMapClick(event.latlng.lat, event.latlng.lng);
      },
    });
    return null;
  };

  return (
    <div className="mt-10 overflow-hidden">
      <MapContainer
        center={[35.6892, 51.389]}
        zoom={5}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
      </MapContainer>

      {weatherData && (
        <div className="flex flex-col justify-center mt-5 bg-gradient-to-l from-slate-800 to-violet-700 text-white rounded-xl py-4 px-6">
          <h2 className="flex gap-x-3 font-bold text-3xl">
            Weather Information for {weatherData.name},{" "}
            {weatherData.sys.country}
            <CiLocationOn />
          </h2>
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
              <div className="flex flex-col items-center py-2 px-4 border rounded-lg gap-y-3">
                <WiHumidity className="size-8" />
                <p>Humidity: {weatherData.main.humidity}%</p>
              </div>
              <div className="flex flex-col items-center py-2 px-4 border rounded-lg gap-y-3">
                <MdDisabledVisible className="size-8" />
                <p>VISIBLITY {weatherData.visibility}</p>
              </div>
              <div className="flex flex-col items-center py-2 px-4 border rounded-lg gap-y-3">
                <GiPressureCooker className="size-8" />
                <p>Pressure: {weatherData.main.pressure} hPa</p>
              </div>
              <div className="flex flex-col items-center py-2 px-4 border rounded-lg gap-y-3">
                <MdSpeed className="size-8" />
                <p>Wind Speed: {weatherData.wind?.speed} m/s</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;

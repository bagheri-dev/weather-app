import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getWeather } from "../apis/fetchWeather";
import { IWeatherData } from "../types/weatherData.Type";
import { CiLocationOn } from "react-icons/ci";
import { FaTemperatureEmpty } from "react-icons/fa6";

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
    <div className="mt-10 flex gap-x-3 items-center">
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
          <h2 className="flex gap-x-3 font-bold text-2xl">
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
              <FaTemperatureEmpty className="size-12" />
              <p className="text-6xl">{weatherData.main.temp}°C</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;

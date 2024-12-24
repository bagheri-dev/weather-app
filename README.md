# Weather App

A React-based weather application that allows users to check real-time weather data by searching for a city. The app uses the OpenWeatherMap and OpenCage Geocoding APIs to retrieve weather and location data, and Leaflet to display an interactive map with the city's geographical location.

## Features
- **Search for a City**: Users can search for any city to retrieve its weather information.
- **Real-Time Weather Data**: Displays current temperature, humidity, weather conditions, and other relevant details.
- **Interactive Map**: Utilizes Leaflet to display a map pinpointing the searched city’s location.
- **Responsive Design**: The app is designed to work on both desktop and mobile devices.

## Technologies Used
- **React**: For building the user interface and managing the state.
- **Axios**: For making HTTP requests to external APIs (OpenWeatherMap and OpenCage).
- **Leaflet**: For rendering an interactive map.
- **React-Leaflet**: A React wrapper for Leaflet to simplify integration.
- **React-Icons**: For using icons in the UI.
- **Tailwind CSS**: For utility-first CSS styling to quickly design the app's UI.

## APIs Used
- **OpenWeatherMap API**: Provides weather data such as temperature, humidity, and weather conditions for any city.
  - API Documentation: [OpenWeatherMap API](https://api.openweathermap.org/data/2.5/weather)
  - You’ll need to sign up and get an API key for accessing weather data.
  
- **OpenCage Geocoding API**: Converts city names to geographic coordinates (latitude and longitude) to center the map on the correct location.
  - API Documentation: [OpenCage Geocoding API](https://api.opencagedata.com/geocode/v1/json)
  - Sign up to get your own API key.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/bagheri-dev/weather-app.git
   cd weather-app
   yarn
   yarn dev

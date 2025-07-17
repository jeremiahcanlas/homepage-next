import React, { useEffect, useState } from "react";

import { WeatherDataStructure } from "../../types";
import Location from "../Location";

const Weather = () => {
  const [weather, setWeather] = useState<WeatherDataStructure | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      const geolocation = localStorage.getItem("user_coords");
      const tempUnit = localStorage.getItem("temperatureUnit");

      if (geolocation) {
        const { lat, lon } = JSON.parse(geolocation);

        try {
          const res = await fetch(
            `/api/get-weather?lat=${lat}&lon=${lon}&unit=${tempUnit}`
          );
          const data = await res.json();

          setWeather(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getWeather();
  }, []);

  const renderWeather = () => {
    if (!weather) {
      return <div className="placeholder w-8 h-15" />;
    }

    return (
      <div>
        <h1>
          {weather.temperature}
          <span>{weather.unit}</span>
        </h1>
        <Location />
      </div>
    );
  };

  return <div>{renderWeather()}</div>;
};

export default Weather;

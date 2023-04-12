import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { Button, Flex } from "@chakra-ui/react";

const Weather = () => {
  const isBrowser = () => typeof window !== "undefined";
  const [weather, setWeather] = useState<weatherDataStructure | null>(null);
  const [coordinates, setCoordinates] = useState<coordinatesData | null>(null);
  const [weatherEnabled, toggleWeather] = useState<any>(false);

  useEffect(() => {
    if (
      weatherEnabled ||
      window.localStorage.getItem("enableWeather") === "true"
    ) {
      triggerLocation();
      window.localStorage.setItem("enableWeather", "true");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (weatherEnabled) {
      triggerLocation();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherEnabled]);

  useEffect(() => {
    if (coordinates) {
      getWeather();

      return () => {
        getWeather();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  const triggerLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      getCoordinates,
      failedToGetCoords
    );
  };

  const getCoordinates = async (coordinates: any) => {
    const { latitude, longitude } = coordinates.coords;

    let getGeoCoords = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&zoom=10&format=json`
    );

    setCoordinates(getGeoCoords.data);
  };

  const failedToGetCoords = () => {
    setCoordinates({
      lat: 37.757815,
      lon: -122.5076398,
      disabled: true,
    });
  };

  const getWeather = async () => {
    try {
      if (!_.isNil(coordinates)) {
        let weatherData = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&current_weather=true&start_date=2023-04-11&end_date=2023-04-11`
        );

        let geoData = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${coordinates.lat}&lon=${coordinates.lon}&zoom=10&format=json`
        );
        setWeather({ weather: weatherData.data, geo: geoData.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("resData", weather);

  return (
    <Flex marginTop="1em">
      {_.isNil(weather) && !weatherEnabled && (
        <Flex marginTop="1em">
          <Button
            isLoading={weatherEnabled && _.isNil(coordinates)}
            onClick={() => toggleWeather(!weatherEnabled)}
          >
            Enable weather
          </Button>
        </Flex>
      )}
      {!_.isNil(weather) && (
        <div>
          <p>{_.get(weather, "weather.current_weather.temperature")} °C</p>
          <p>
            {_.get(weather, "geo.address.city")},{" "}
            {_.get(weather, "geo.address.state")}
          </p>
        </div>
      )}
    </Flex>
  );
};

export interface weatherDataStructure {
  weather?: Object;
  geo?: Object;
}

export interface coordinatesData {
  lat: Number;
  lon: Number;
  disabled?: Boolean;
}

export default Weather;

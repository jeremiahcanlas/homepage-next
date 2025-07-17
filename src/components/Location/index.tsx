import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { Coords, LocationData } from "../../types";

export default function Location() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocationAndResolve = () => {
      if (!navigator.geolocation) {
        setError("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoords: Coords = {
            lat: parseFloat(position.coords.latitude.toFixed(5)),
            lon: parseFloat(position.coords.longitude.toFixed(5)),
          };

          const cachedCoordsRaw = localStorage.getItem("user_coords");
          const cachedCoords: Coords | null = cachedCoordsRaw
            ? JSON.parse(cachedCoordsRaw)
            : null;

          const coordsChanged =
            !cachedCoords ||
            cachedCoords.lat !== newCoords.lat ||
            cachedCoords.lon !== newCoords.lon;

          if (coordsChanged) {
            console.log("Coords changed, updating...");
            localStorage.setItem("user_coords", JSON.stringify(newCoords));
            localStorage.removeItem("user_location_data");
            reverseGeocode(newCoords.lat, newCoords.lon);
          } else {
            const cachedLocation = localStorage.getItem("user_location_data");
            if (cachedLocation) {
              setLocation(JSON.parse(cachedLocation));
            } else {
              reverseGeocode(newCoords.lat, newCoords.lon);
            }
          }
        },
        (err) => {
          setError(err.message || "Permission denied");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        }
      );
    };

    const reverseGeocode = async (lat: number, lon: number) => {
      try {
        const res = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lon}`);
        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          localStorage.setItem("user_location_data", JSON.stringify(data));
          setLocation(data);
        }
      } catch {
        setError("Failed to reverse geocode location");
      }
    };

    getLocationAndResolve();
  }, []);

  const renderContent = () => {
    if (error) {
      return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!location) {
      return <div className="placeholder w-30 h-5" />;
    }

    return (
      <h2>
        <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
        {location.city}
        {location.stateProvince ? ", " + location.stateProvince : ""}
      </h2>
    );
  };

  return <div>{renderContent()}</div>;
}

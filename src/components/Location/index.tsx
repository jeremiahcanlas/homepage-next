import { LocationData } from "@component/types";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Location() {
  const [location, setLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    const geolocation = localStorage.getItem("user_coords");

    const getLocation = async () => {
      if (geolocation) {
        const { lat, lon } = JSON.parse(geolocation);

        try {
          const res = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lon}`);
          const data = await res.json();

          setLocation(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getLocation();
  }, []);

  const renderContent = () => {
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

import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Location() {
  const renderContent = () => {
    const stored = localStorage.getItem("user_location_data");
    const location = stored != null ? JSON.parse(stored) : null;

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

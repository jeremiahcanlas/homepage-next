import { getCoords } from "@component/utils/location";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import Clock from "../Clock";
import Greet from "../Greet";
import Location from "../Location";
import Menu from "../Menu";
import Quote from "../Quotes";
import Search from "../Search";
import Weather from "../Weather";

const Mainpage = () => {
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isQuoteDisabled, setIsQuoteDisabled] = useState(false);

  useEffect(() => {
    const fetchCoords = async () => {
      await getCoords();
    };
    fetchCoords();
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("username") &&
      localStorage.getItem("user_coords")
    ) {
      setIsMenuOpen(false);
    }

    const stored = localStorage.getItem("dark-toggled");

    const shouldUseDark = stored != null ? JSON.parse(stored) : false;

    document.documentElement.classList.toggle("dark", shouldUseDark);

    const storedDisableQuotes = localStorage.getItem("disableQuotes");

    setIsQuoteDisabled(
      storedDisableQuotes != null ? JSON.parse(storedDisableQuotes) : false
    );
  }, [isClient]);

  const renderMainPageContent = () => {
    if (!isClient) return null;

    if (isMenuOpen) {
      return <Menu />;
    }

    return (
      <div className="main-container">
        <Greet />
        <Clock />
        <div>
          <Weather />
          <Location />
        </div>

        <Search />

        {!isQuoteDisabled ? <Quote /> : null}
        <button
          className="cursor-pointer absolute bottom-10 right-10"
          onClick={() => {
            setIsMenuOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faGear} size="2xl" />
        </button>
      </div>
    );
  };

  return (
    <div className="main-container relative">{renderMainPageContent()}</div>
  );
};

export default Mainpage;

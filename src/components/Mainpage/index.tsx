import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { MainpageProps } from "../../types";
import Clock from "../Clock";
import Greet from "../Greet";
import Menu from "../Menu";
import Quote from "../Quotes";
import Weather from "../Weather";

const Mainpage = ({ pageProps }: MainpageProps) => {
  const { quote, message } = pageProps;

  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Wait until component has mounted
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      setIsMenuOpen(true);
    }

    const stored = localStorage.getItem("dark-toggled");

    const shouldUseDark = stored != null ? JSON.parse(stored) : false;

    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, [isClient]);

  const renderMainPageContent = () => {
    if (!isClient)
      return (
        <div className="flex justify-center">Loading user settings...</div>
      );

    if (isMenuOpen) {
      return <Menu />;
    }

    return (
      <div className="main-container">
        <Greet message={message} />
        <Clock />
        <Weather />
        <Quote quote={quote} />
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

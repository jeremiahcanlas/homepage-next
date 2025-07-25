import { faMoon, faMugSaucer, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";

const Greet = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));

    const hours = new Date().getHours();

    let message;

    if (hours >= 18) {
      message = "Good evening";
    } else if (hours >= 12) {
      message = "Good afternoon";
    } else if (hours >= 5) {
      message = "Good morning";
    } else {
      message = "Early morning";
    }

    setMessage(message);
  }, []);

  const greetingText = username ? `${message}, ${username}` : message;

  const icon = useMemo(() => {
    const hours = new Date().getHours();
    if (hours >= 18) return faMoon;
    if (hours >= 12) return faSun;
    return faMugSaucer;
  }, []);

  return (
    <div className="uppercase max-w-[80vw]">
      <h1 className="whitespace-nowrap">
        {greetingText}
        <span className="ml-1">
          <FontAwesomeIcon width="20px" icon={icon} />
        </span>
      </h1>
    </div>
  );
};

export default Greet;

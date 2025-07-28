import { faMoon, faMugSaucer, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";

import greetingsData from "./greetings.json";

const Greet = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));

    const hour = new Date().getHours();

    const currentPeriod = greetingsData.find(
      (g) => hour >= g.range.start && hour < g.range.end
    );

    if (currentPeriod && username) {
      const randomMsg =
        currentPeriod.messages[
          Math.floor(Math.random() * currentPeriod.messages.length)
        ];
      setMessage(randomMsg.replace("{{name}}", username));
    }
  }, [username]);

  const icon = useMemo(() => {
    const hours = new Date().getHours();
    if (hours >= 18) return faMoon;
    if (hours >= 12) return faSun;
    return faMugSaucer;
  }, []);

  return (
    <div className="uppercase max-w-[80vw]">
      <h1 className="whitespace-nowrap">
        {message}
        <span className="ml-1">
          <FontAwesomeIcon width="20px" icon={icon} />
        </span>
      </h1>
    </div>
  );
};

export default Greet;

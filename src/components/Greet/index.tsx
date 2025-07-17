import {
  faCloudMoon,
  faCloudSun,
  faMugSaucer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";

type GreetProps = {
  message: string;
};

const Greet = ({ message }: GreetProps) => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  const greetingText = username ? `${message}, ${username}` : message;

  const icon = useMemo(() => {
    const hours = new Date().getHours();
    if (hours >= 18) return faCloudMoon;
    if (hours >= 12) return faCloudSun;
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

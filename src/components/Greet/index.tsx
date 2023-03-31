import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Box } from "@chakra-ui/react";

const Greet = () => {
  const [greet, setGreet] = useState("");
  // const isBrowser = () => typeof window !== "undefined";
  const isBrowser = false;

  useEffect(() => {
    greeting();
  }, []);

  // const name = ` ${(isBrowser && window.localStorage.getItem("name")) || ""}`;
  const name = `Jeremiah`;

  //sets the greeting depends on the 24 hr clock
  const greeting = () => {
    const hours = new Date().getHours();

    return hours >= 18
      ? setGreet("Good evening")
      : hours >= 12
      ? setGreet("Good afternoon")
      : hours >= 5
      ? setGreet("Good morning")
      : setGreet("Early morning");
  };

  return (
    <Box>
      <span>
        {greet.toUpperCase()}
        {isBrowser && window.localStorage.getItem("name") === "" ? "" : ","}
        {_.toUpper(name)}
      </span>
    </Box>
  );
};

export default Greet;

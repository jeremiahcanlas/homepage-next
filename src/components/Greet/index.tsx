import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Box } from "@chakra-ui/react";
import styles from "./Greet.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudMoon,
  faCloudSun,
  faMugSaucer,
} from "@fortawesome/free-solid-svg-icons";

const Greet = () => {
  const [greet, setGreet] = useState("");

  // const isBrowser = () => typeof window !== "undefined";
  const isBrowser = false;
  const hours = new Date().getHours();

  useEffect(() => {
    greeting();
  });

  // const name = ` ${(isBrowser && window.localStorage.getItem("name")) || ""}`;
  const name = `Jeremiah`;

  //sets the greeting depends on the 24 hr clock
  const greeting = () => {
    return hours >= 18
      ? setGreet("Good evening")
      : hours >= 12
      ? setGreet("Good afternoon")
      : hours >= 5
      ? setGreet("Good morning")
      : setGreet("Early morning");
  };

  const getEmoji = () => {
    return hours >= 18 ? (
      <FontAwesomeIcon icon={faCloudMoon} />
    ) : hours >= 12 ? (
      <FontAwesomeIcon icon={faCloudSun} />
    ) : hours >= 5 ? (
      <FontAwesomeIcon icon={faMugSaucer} />
    ) : (
      <FontAwesomeIcon icon={faMugSaucer} />
    );
  };

  return (
    <Box className={styles.greetContainer}>
      <span>
        {greet.toUpperCase()}
        {isBrowser && window.localStorage.getItem("name") === "" ? "" : ", "}
        {_.toUpper(name)} {getEmoji()}
      </span>
    </Box>
  );
};

export default Greet;

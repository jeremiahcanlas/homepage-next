import { Heading, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "./Clock.module.scss";
import _ from "lodash";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  //   TODO: need to figure out which type
  const tick: any = () => {
    setInterval(() => {
      let time = new Date();
      setTime(time);
    }, 1000);
  };

  useEffect(() => {
    tick();
    return () => {
      clearInterval(tick);
    };
  }, [time]);

  const currentTime = !_.isNil(time)
    ? time.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "numeric",
        // second: "2-digit", //if enabled it will get hydration error
        hour12: true,
      })
    : null;

  const currentDate = time
    .toLocaleString("en-US", { dateStyle: "full" })
    .toUpperCase();

  return (
    <Stack className={styles.clockContainer}>
      <Heading as="h1" className={styles.time}>
        {currentTime}
      </Heading>
      <Heading as="h2" className={styles.date}>
        {currentDate}
      </Heading>
    </Stack>
  );
};

export default Clock;

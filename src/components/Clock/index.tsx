import { Heading, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "./Clock.module.scss";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  //   TODO: need to figure out which type
  const tick: any = () => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  };

  useEffect(() => {
    tick();
    return () => {
      clearInterval(tick);
    };
  }, [time]);

  const currentTime = time.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "numeric",
    hour12: true,
  });

  const currentDate = time
    .toLocaleString("en-US", { dateStyle: "full" })
    .toUpperCase();

  return (
    <Stack className={styles.clockContainer}>
      <Heading as="h1">{currentTime}</Heading>
      <Heading as="h2">{currentDate}</Heading>
    </Stack>
  );
};

export default Clock;

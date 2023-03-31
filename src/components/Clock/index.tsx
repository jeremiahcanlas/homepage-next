import React, { useEffect, useState } from "react";

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
    <div>
      <h1>{currentTime}</h1>
      <h2>{currentDate}</h2>
    </div>
  );
};

export default Clock;

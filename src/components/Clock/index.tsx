import { useEffect, useState } from "react";

const Clock = () => {
  const [dateTime, setDateTime] = useState(() => {
    const now = new Date();
    return {
      currentDate: now
        .toLocaleString("en-US", { dateStyle: "full" })
        .toUpperCase(),
      currentTime: now.toLocaleString("en-US", {
        hour: "2-digit",
        hour12: localStorage.getItem("clockFormat") === "12" ? true : false,
        minute: "2-digit",
      }),
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setDateTime({
        currentDate: now
          .toLocaleString("en-US", { dateStyle: "full" })
          .toUpperCase(),
        currentTime: now.toLocaleString("en-US", {
          hour: "2-digit",
          hour12: localStorage.getItem("clockFormat") === "12" ? true : false,
          minute: "2-digit",
        }),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>{dateTime.currentTime}</h1>
      <h2>{dateTime.currentDate}</h2>
    </div>
  );
};

export default Clock;

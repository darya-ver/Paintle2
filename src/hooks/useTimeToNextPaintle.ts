import { useEffect, useState } from "react";
import { getTimeUntilNextPaintle } from "../utils";

export const useTimeToNextPaintle = () => {
  const [secondsTillMidnight, setSecondsTillMidnight] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0
      );
      setSecondsTillMidnight((midnight.getTime() - now.getTime()) / 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return {
    timeToNextPaintle: getTimeUntilNextPaintle(secondsTillMidnight),
  };
};

import { useState, useEffect } from "react";
import { Holiday } from "../App";

export function useFetchHolidays(url: string) {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setHolidays(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHolidays();
  }, [url]);

  return {
    holidays
  };
}

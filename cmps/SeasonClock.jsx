import { utilService } from "../services/util.service.js";
const { useState, useEffect } = React;

export function SeasonClock({ date = new Date() }) {
  if (!(date instanceof Date)) {
    throw new Error("Date is not a valid date object");
  }
  const [now, setNow] = useState(date); // current Now dictated by date prop
  const [isDark, setIsDark] = useState(false);
  // causes a rerender every second, seconds are unsyncronized with global clock
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow((prev) => new Date(prev.getTime() + 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  let season = getSeason(now);
  let monthName = utilService.getMonthName(now);
  let dayName = utilService.getDayName(now);
  const nextSeasonDate = getNextSeasonDate(now);
  const countdown = getCountdown(nextSeasonDate, now);

  const imgSrc = `./assets/img/${season}.png`;
  return (
    <section
      className={`season-card ${isDark ? `${season}-dark` : season}`}
      onClick={() => setIsDark((prev) => !prev)}
    >
      <h1>
        {date.getDate()}, {monthName}({capitalize(season)})
      </h1>
      <img src={imgSrc} className="season-icon"></img>
      <h1>{dayName}</h1>
      <h2>{now.toLocaleTimeString()}</h2>

      <h3>
        Next season in: {countdown.days}d {countdown.hours}h {countdown.minutes}
        m {countdown.seconds}s
      </h3>
    </section>
  );
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
// equinox seasons logic
function getSeason(date) {
  // defaults to winter if the date is erroneous
  let day, month;
  try {
    day = date.getDate();
    month = date.getMonth() + 1;
  } catch (error) {
    throw new Error("Invalid date object");
  }

  if (
    (month === 3 && day >= 20) ||
    (month > 3 && month < 6) ||
    (month === 6 && day <= 20)
  ) {
    return "spring";
  } else if (
    (month === 6 && day >= 21) ||
    (month > 6 && month < 9) ||
    (month === 9 && day <= 21)
  ) {
    return "summer";
  } else if (
    (month === 9 && day >= 22) ||
    (month > 9 && month < 12) ||
    (month === 12 && day <= 20)
  ) {
    return "autumn";
  } else {
    return "winter";
  }
}

function getCountdown(targetDate, now) {
  const diffMs = targetDate - now;
  if (diffMs <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function getNextSeasonDate(date) {
  const year = date.getFullYear();
  const seasonBoundaries = [
    new Date(year, 2, 20, 0, 0, 0), // March 20
    new Date(year, 5, 21, 0, 0, 0), // June 21
    new Date(year, 8, 22, 0, 0, 0), // September 22
    new Date(year, 11, 21, 0, 0, 0), // December 21
    new Date(year + 1, 2, 20, 0, 0, 0), // Next year's spring
  ];

  for (const boundary of seasonBoundaries) {
    if (date < boundary) return boundary;
  }
}

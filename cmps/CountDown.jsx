const { useState, useEffect } = React;

export function CountDown(props) {
  // {toTime || startFrom, onDone}
  const [clockSecs, setClockSecs] = useState(props.startFrom);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClockSecs((prevClockSecs) => {
        if (prevClockSecs === 1) {
          clearInterval(intervalId);
          if (props.onDone) props.onDone();
        }
        return prevClockSecs - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const style = clockSecs <= 6 ? {color: "red"} : {};
  return (
    <section className="countdown-container">
      <h1 style={style}>{clockSecs}</h1>
    </section>
  );
}

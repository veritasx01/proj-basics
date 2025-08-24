import { AppHeader } from "./cmps/AppHeader.jsx";
import { Home } from "./pages/Home.jsx";
import { About } from "./pages/About.jsx";
import { AnimalList } from "./cmps/AnimalList.jsx";
import { SeasonClock } from "./cmps/SeasonClock.jsx";
import { CountDown } from "./cmps/CountDown.jsx";
import { WatcherApp } from "./cmps/WatcherApp.jsx";

let animalInfos = [
  { type: "Malayan Tiger", count: 787 },
  { type: "Mountain Gorilla", count: 212 },
  { type: "Fin Whale", count: 28 },
];

const { useState } = React;

export function RootCmp() {
  const [page, setPage] = useState("home");
  return (
    <section className="app main-layout">
      <AppHeader page={page} onSetPage={setPage} />
      <main>
        <main>
          {page === "home" && <Home />}
          {page === "about" && <About />}
        </main>
      </main>
      <h1>Exercise 1</h1>
      <AnimalList animalInfos={animalInfos} />
      <h1>Exercise 2</h1>
      <div style={{display: "flex", flexDirection: "row"}}>
        <SeasonClock></SeasonClock>
        <SeasonClock
          date={new Date(new Date().setMonth(new Date().getMonth() + 3))}
        ></SeasonClock>
        <SeasonClock
          date={new Date(new Date().setMonth(new Date().getMonth() + 6))}
        ></SeasonClock>
        <SeasonClock
          date={new Date(new Date().setMonth(new Date().getMonth() + 9))}
        ></SeasonClock>
      </div>
      <h1>Exercise 3</h1>
      <CountDown startFrom={10}/>
      <h1>Exercise 4</h1>
      <WatcherApp ></WatcherApp>
      <h1>Exercise 5</h1>
    </section>
  );
}

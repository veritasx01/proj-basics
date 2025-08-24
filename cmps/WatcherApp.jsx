import { watcherService } from "../services/watcher.service.js";
const { useState } = React;

export function WatcherApp(props) {
  const [watchers, setWatchers] = useState(() => {
    if (!("amount" in props)) {
      return watcherService.generateWatchers(3,true);
    }
    return watcherService.generateWatchers(props.amount, true);
  });
  console.log(watchers);

  const addWatcher = () => {
    const newWatcher = watcherService.generateRandomWatcher();
    setWatchers(prev => [...prev, newWatcher]);
    watcherService.save(watchers);
  };

  const removeWatcher = (id) => {
    setWatchers(prev => prev.filter(w => w.id !== id));
    watcherService.save(watchers);
  };

  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      <button onClick={addWatcher}>Add Watcher</button>
      {watchers.map((watcher) => (
        <div className="watcher-card" key={watcher.id}>
          <h1>{watcher.fullname}</h1>
          <div style={{display: "flex", flexDirection: "row"}}>
            <button onClick={() => removeWatcher(watcher.id)}>X</button>
            <button>select</button>
          </div>
        </div>
      ))}
    </div>
  );
}

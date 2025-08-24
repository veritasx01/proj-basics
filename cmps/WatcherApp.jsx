import { watcherService } from "../services/watcher.service.js";
const { useEffect, useState } = React;

export function WatcherApp(props) {
  const [selectedWatcher, setSelectedWatcher] = useState(-1);
  const [watchers, setWatchers] = useState(() => {
    if (!("amount" in props)) {
      const wat = watcherService.generateWatchers(3, true);
      return wat;
    }
    return watcherService.generateWatchers(props.amount, true);
  });

  useEffect(() => {
    watcherService.save(watchers);
  }, [watchers]);
  console.log(watchers);

  const addWatcher = async () => {
    const newWatcher = watcherService.generateRandomWatcher();
    const updated = [...watchers, newWatcher];
    setWatchers(updated);
  };

  const removeWatcher = async (id) => {
    const updated = watchers.filter((w) => w.id !== id);
    setWatchers(updated);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <button onClick={addWatcher}>Add Watcher</button>
      {watchers.map((watcher, idx) => (
        <div className="watcher-card" key={watcher.id}>
          <h1>{watcher.fullname}</h1>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <button onClick={() => removeWatcher(watcher.id)}>X</button>
            <button onClick={() => setSelectedWatcher(idx)}>select</button>
          </div>
          <Modal isOpen={selectedWatcher === idx} onClose={() => setSelectedWatcher(-1)} key={idx}>
            <h2>{watcher.movies.join(' ,')}</h2>
          </Modal>
        </div>
      ))}
    </div>
  );
}

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{ float: "right" }}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

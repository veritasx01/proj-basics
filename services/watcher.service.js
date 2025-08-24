import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';

export const watcherService = {
  query,
  get,
  remove,
  save,
  createWatcher,
  generateRandomWatcher,
  generateWatchers,
};

const WATCHER_KEY = 'watcherDB';

function query(filterBy = {}) {
  return storageService.query(WATCHER_KEY).then((watchers) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i');
      watchers = watchers.filter((watcher) => regExp.test(watcher.txt));
    }
    return watchers;
  });
}

function get(watcherId) {
  return storageService.get(WATCHER_KEY, watcherId).then((watcher) => {
    return watcher;
  });
}

function remove(watcherId) {
  return storageService.remove(WATCHER_KEY, watcherId);
}

function save(watcher) {
  if (watcher.id) {
    return storageService.put(WATCHER_KEY, watcher);
  } else {
    return storageService.post(WATCHER_KEY, watcher);
  }
}

function createWatcher(fullname = '', movies = '') {
  const watcher = { fullname: fullname, movies: movies };
  watcher.id = utilService.makeId(10); // 62^10 = 839,299,365,868,340,224, unlikely to collide with other id's
  return watcher;
}

function getRandomMovies(movieList) {
  const count = utilService.getRandomIntInclusive(1, movieList.length);
  const shuffled = [...movieList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateRandomWatcher() {
  // prettier-ignore
  const firstnames = [
    "James", "Olivia", "Liam", "Emma", "Noah",
    "Ava", "Sophia", "Mason", "Isabella", "Ethan",
    "Mia", "Lucas", "Charlotte", "Logan", "Amelia"
  ];
  // prettier-ignore
  const lastnames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones",
    "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson"
  ];
  // prettier-ignore
  const movies = [
    "Inception", "The Matrix", "Interstellar", "The Dark Knight",
    "Pulp Fiction", "Fight Club", "Forrest Gump", "The Godfather",
    "The Shawshank Redemption", "Parasite", "Gladiator",
    "Titanic", "Avengers: Endgame", "Jurassic Park", "Goodfellas"
  ];
  let idx1 = utilService.getRandomIntInclusive(0, firstnames.length - 1);
  let idx2 = utilService.getRandomIntInclusive(0, lastnames.length - 1);
  let fullname = firstnames[idx1] + ' ' + lastnames[idx2];
  return createWatcher(fullname, getRandomMovies(movies));
}

function generateWatchers(num = 3, override = false) {
  let watchers = utilService.loadFromStorage(WATCHER_KEY) || [];
  if (override) {
    watchers = [];
    for (let i = 0; i < num; i++) {
      watchers.push(generateRandomWatcher());
    }
  } else {
    for (let i = 0; i < num-watchers.length; i++) {
      watchers.push(generateRandomWatcher());
    }
  }
  utilService.saveToStorage(WATCHER_KEY, watchers);
  return watchers;
}

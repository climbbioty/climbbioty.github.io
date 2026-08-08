import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get,
    child,
    onValue
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {currentRoom} from "./room.js";

const firebaseConfig = {
  apiKey: "AIzaSyA7PpddeYPWBczMv7z-VHZ0esFwkaBNBms",
  authDomain: "ransomnoteish.firebaseapp.com",
  databaseURL: "https://ransomnoteish-default-rtdb.firebaseio.com",
  projectId: "ransomnoteish",
  storageBucket: "ransomnoteish.firebasestorage.app",
  messagingSenderId: "458933010520",
  appId: "1:458933010520:web:e3e25257bdbec3758aca2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

set(
    ref(database, `rooms/${currentRoom}/prompt`),
    prompt
);

export {
    database,
    ref,
    set,
    get,
    child,
    onValue
};

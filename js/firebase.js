import { initializeApp } from "...";

import {
    getDatabase,
    ref,
    set,
    get,
    child,
    onValue
} from "...";

const firebaseConfig = { ... };

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export {
    database,
    ref,
    set,
    get,
    child,
    onValue
};

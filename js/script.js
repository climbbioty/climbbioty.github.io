import {
    database,
    ref,
    set,
    get,
    child,
    onValue
} from "./firebase.js";
import { watchPrompt} from "./game.js";
import {prompts} from "./prompts.js";
import { words } from "./words.js";
import {currentRoom} from "./room.js";

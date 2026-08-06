import {
    database,
    ref,
    set,
    get,
    child,
    onValue
} from "./firebase.js";
import {} from "./game.js";
import {} from "./prompts.js";
import {} from "./words.js";
import {setupRooms} from "./room.js";

const wordButton = document.getElementById("wordButton");

wordButton.addEventListener("click", () => {

    generateWords();

});

watchPrompt();

document.getElementById("roomDisplay").textContent =
    "Room Code: " + roomCode;

});

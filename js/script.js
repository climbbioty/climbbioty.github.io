import { setupRoom, currentRoom } from "./room.js";
import { setupGame, watchPrompt } from "./game.js";

setupRoom();

setupGame();

setInterval(() => {

    if (currentRoom !== "") {

        watchPrompt();

    }

}, 500);

import { setupRoom, currentRoom } from "./room.js";
import { setupGame, watchPrompt } from "./game.js";

setupRooms();

setupGame();

setInterval(() => {

    if (currentRoom !== "") {

        watchPrompt();

    }

}, 500);

import {
    setupRoom
} from "./room.js";

import {
    setupGame,
    watchPrompt
} from "./game.js";


setupRooms(() => {

    watchPrompt();

});


setupGame();

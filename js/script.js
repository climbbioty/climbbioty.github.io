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
import {setUpRooms} from "./room.js";

const wordButton = document.getElementById("wordButton");

wordButton.addEventListener("click", () => {

    generateWords();

});

watchPrompt();

document.getElementById("roomDisplay").textContent =
    "Room Code: " + roomCode;

});

document.getElementById("joinRoomButton")
.addEventListener("click", async () => {

    const code =
        document.getElementById("roomInput")
        .value
        .toUpperCase();

    const snapshot = await get(
        child(ref(database), "rooms/" + code)
    );

    if(snapshot.exists()){

        currentRoom = code;

        watchPrompt();

        document.getElementById("roomDisplay").textContent =
            "Joined Room: " + code;

    }else{

        alert("Room not found.");

    }

});

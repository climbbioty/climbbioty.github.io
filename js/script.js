import {
    database,
    ref,
    set,
    get,
    child,
    onValue
} from "./firebase.js";

let currentRoom = "";

const promptBox = document.getElementById("promptBox");
const promptButton = document.getElementById("promptButton");
const wordBank = document.getElementById("wordBank");
const answerArea = document.getElementById("answerArea");

// Generate a new prompt only

promptButton.addEventListener("click", () => {

const randomPrompt =
    prompts[Math.floor(Math.random() * prompts.length)];

set(ref(database, "rooms/" + currentRoom + "/prompt"), randomPrompt);

});

const wordButton = document.getElementById("wordButton");

wordButton.addEventListener("click", () => {

    generateWords();

});

function generateRoomCode(){

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "";

    for(let i = 0; i < 5; i++){
        code += characters[
            Math.floor(Math.random() * characters.length)
        ];
    }

    return code;
}

document.getElementById("roomButton")
.addEventListener("click", () => {

    const roomCode = generateRoomCode();

    currentRoom = roomCode;

set(ref(database, "rooms/" + roomCode), {
    prompt: "",
    state: "lobby"
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

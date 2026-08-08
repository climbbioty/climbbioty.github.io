import {
    database,
    ref,
    set,
    get,
    child
} from "./firebase.js";

export let currentRoom = "";

export function setupRoom() {

    const roomButton =
        document.getElementById("roomButton");

    const joinButton =
        document.getElementById("joinRoomButton");

    roomButton.addEventListener("click", createRoom);

    joinButton.addEventListener("click", joinRoom);

}

function createRoom() {

    const roomCode = generateRoomCode();

    currentRoom = roomCode;

    set(ref(database, `rooms/${roomCode}`), {

        prompt: "",

        state: "lobby"

    });

    document.getElementById("roomDisplay").textContent =
        "Room: " + roomCode;

}

async function joinRoom() {

    const code =
        document.getElementById("roomInput")
        .value
        .trim()
        .toUpperCase();

    const snapshot =
        await get(child(ref(database), `rooms/${code}`));

    if (snapshot.exists()) {

        currentRoom = code;

        document.getElementById("roomDisplay").textContent =
            "Room: " + code;

    } else {

        alert("Room not found.");

    }

}

function generateRoomCode() {

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "";

    for (let i = 0; i < 5; i++) {

        code += chars[Math.floor(Math.random() * chars.length)];

    }

    return code;
}

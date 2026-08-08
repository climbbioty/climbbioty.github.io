import {
    database,
    ref,
    set,
    get,
    child
} from "./firebase.js";

export let currentRoom = "";

export function setupRoom(onRoomReady) {

    const roomButton =
        document.getElementById("roomButton");

    const joinButton =
        document.getElementById("joinRoomButton");


    roomButton.addEventListener("click", () => {

        createRoom(onRoomReady);

    });


    joinButton.addEventListener("click", () => {

        joinRoom(onRoomReady);

    });

}


async function createRoom(onRoomReady) {

    const roomCode = generateRoomCode();

    currentRoom = roomCode;

    try {

        await set(
            ref(database, `rooms/${roomCode}`),
            {
                prompt: "",
                state: "lobby"
            }
        );

        document.getElementById("roomDisplay").textContent =
            "Room: " + roomCode;

        console.log("Room created:", roomCode);

        if (onRoomReady) {
            onRoomReady();
        }

    } catch (error) {

        console.error("Error creating room:", error);

        alert("Could not create room.");

    }

}


async function joinRoom(onRoomReady) {

    const code =
        document.getElementById("roomInput")
        .value
        .trim()
        .toUpperCase();


    if (code === "") {

        alert("Enter a room code.");

        return;

    }


    try {

        const snapshot =
            await get(
                child(
                    ref(database),
                    `rooms/${code}`
                )
            );


        if (snapshot.exists()) {

            currentRoom = code;

            document.getElementById("roomDisplay").textContent =
                "Room: " + code;

            console.log("Joined room:", code);

            if (onRoomReady) {
                onRoomReady();
            }

        } else {

            alert("Room not found.");

        }

    } catch (error) {

        console.error("Error joining room:", error);

        alert("Could not join room.");

    }

}


function generateRoomCode() {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "";

    for (let i = 0; i < 5; i++) {

        code += chars[
            Math.floor(
                Math.random() * chars.length
            )
        ];

    }

    return code;

}

let currentRoom = "";

export function setupRooms() {

    document.getElementById("roomButton")
.addEventListener("click", () => {

    const roomCode = generateRoomCode();

    currentRoom = roomCode;

set(ref(database, "rooms/" + roomCode), {
    prompt: "",
    state: "lobby"
});

    document.getElementById("joinRoomButton")
        .addEventListener(...);

}



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


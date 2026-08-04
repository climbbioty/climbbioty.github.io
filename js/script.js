import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get,
    child,
    onValue
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

let currentRoom = "";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7PpddeYPWBczMv7z-VHZ0esFwkaBNBms",
  authDomain: "ransomnoteish.firebaseapp.com",
  databaseURL: "https://ransomnoteish-default-rtdb.firebaseio.com",
  projectId: "ransomnoteish",
  storageBucket: "ransomnoteish.firebasestorage.app",
  messagingSenderId: "458933010520",
  appId: "1:458933010520:web:e3e25257bdbec3758aca2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

// ---------- Get HTML Elements ----------

const promptBox = document.getElementById("promptBox");
const promptButton = document.getElementById("promptButton");
const wordBank = document.getElementById("wordBank");
const answerArea = document.getElementById("answerArea");

// ---------- Generate Prompt ----------

// Generate a new prompt only

promptButton.addEventListener("click", () => {

    const randomPrompt =
    prompts[Math.floor(Math.random() * prompts.length)];

if(currentRoom === ""){
    alert("Create or join a room first.");
    return;
}

const randomPrompt =
    prompts[Math.floor(Math.random() * prompts.length)];

set(ref(database, "rooms/" + currentRoom + "/prompt"), randomPrompt);

});


// Generate magnets only

const wordButton = document.getElementById("wordButton");

wordButton.addEventListener("click", () => {

    generateWords();

});

// ---------- Generate Magnets ----------

function generateWords() {

    wordBank.innerHTML = "";
    answerArea.innerHTML = "";

    const shuffled = [...words];

    shuffled.sort(() => Math.random() - 0.5);

    const hand = shuffled.slice(0, 20);

    hand.forEach(word => {

        const magnet = document.createElement("div");

        magnet.textContent = word;

        magnet.classList.add("magnet");

        magnet.draggable = true;

        magnet.addEventListener("dragstart", dragStart);

        wordBank.appendChild(magnet);

    });

}

// ---------- Dragging ----------

let draggedMagnet = null;

function dragStart(e){

    draggedMagnet = e.target;

}

wordBank.addEventListener("dragover", e => {

    e.preventDefault();

});

answerArea.addEventListener("dragover", e => {

    e.preventDefault();

});

wordBank.addEventListener("drop", () => {

    if(draggedMagnet){

        wordBank.appendChild(draggedMagnet);

    }

});

answerArea.addEventListener("drop", () => {

    if(draggedMagnet){

        answerArea.appendChild(draggedMagnet);

    }

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

function watchPrompt(){

    onValue(
        ref(database, "rooms/" + currentRoom + "/prompt"),
        (snapshot)=>{

            if(snapshot.exists()){

                promptBox.textContent = snapshot.val();

            }

        }
    );

}

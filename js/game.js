import { prompts } from "./prompts.js";
import { words } from "./words.js";
import {
    database,
    ref,
    set,
    onValue
} from "./firebase.js";

export function watchPrompt(){

    onValue(
        ref(database, "rooms/" + currentRoom + "/prompt"),
        (snapshot)=>{

            if(snapshot.exists()){

                promptBox.textContent = snapshot.val();

            }

        }
    );

}

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

const promptBox = document.getElementById("promptBox");
const promptButton = document.getElementById("promptButton");
const wordBank = document.getElementById("wordBank");
const answerArea = document.getElementById("answerArea");

promptButton.addEventListener("click", () => {

const randomPrompt =
    prompts[Math.floor(Math.random() * prompts.length)];

set(ref(database, "rooms/" + currentRoom + "/prompt"), randomPrompt);

});

const wordButton = document.getElementById("wordButton");

wordButton.addEventListener("click", () => {

    generateWords();

});

watchPrompt();

document.getElementById("roomDisplay").textContent =
    "Room Code: " + roomCode;

});

import { prompts } from "./prompts.js";
import { words } from "./words.js";

import {

    database,
    ref,
    set,
    onValue

} from "./firebase.js";

import { currentRoom } from "./room.js";

const promptBox =
    document.getElementById("promptBox");

const promptButton =
    document.getElementById("promptButton");

const wordButton =
    document.getElementById("wordButton");

const wordBank =
    document.getElementById("wordBank");

const answerArea =
    document.getElementById("answerArea");

export function setupGame() {

    promptButton.addEventListener("click", generatePrompt);

    wordButton.addEventListener("click", generateWords);

}

function generatePrompt() {

    if (currentRoom === "") {

        alert("Create or join a room.");

        return;

    }

    const randomPrompt =
        prompts[Math.floor(Math.random() * prompts.length)];

    set(
        ref(database, `rooms/${currentRoom}/prompt`),
        randomPrompt
    );

}

export function watchPrompt() {

    if (currentRoom === "") return;

    onValue(

        ref(database, `rooms/${currentRoom}/prompt`),

        (snapshot) => {

            if (snapshot.exists()) {

                promptBox.textContent = snapshot.val();

            }

        }

    );

}

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

let draggedMagnet = null;

function dragStart(e) {

    draggedMagnet = e.target;

}

wordBank.addEventListener("dragover", e => e.preventDefault());

answerArea.addEventListener("dragover", e => e.preventDefault());

wordBank.addEventListener("drop", () => {

    if (draggedMagnet) {

        wordBank.appendChild(draggedMagnet);

    }

});

answerArea.addEventListener("drop", () => {

    if (draggedMagnet) {

        answerArea.appendChild(draggedMagnet);

    }

});


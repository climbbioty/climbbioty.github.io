import { initializeApp } from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get,
    child,
    onValue,
    push
} from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// ============================================================
// FIREBASE
// ============================================================

const firebaseConfig = {
  const firebaseConfig = {
  apiKey: "AIzaSyA7PpddeYPWBczMv7z-VHZ0esFwkaBNBms",
  authDomain: "ransomnoteish.firebaseapp.com",
  databaseURL: "https://ransomnoteish-default-rtdb.firebaseio.com",
  projectId: "ransomnoteish",
  storageBucket: "ransomnoteish.firebasestorage.app",
  messagingSenderId: "458933010520",
  appId: "1:458933010520:web:e3e25257bdbec3758aca2d"
};
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);


// ============================================================
// PROMPTS
// ============================================================

const prompts = [
    "Convince me to adopt a dragon.",
    "Explain why you should never trust a wizard.",
    "Write an advertisement for the worst vacation ever.",
    "Explain why your pet should be president.",
    "Describe the perfect superpower.",
    "Write a terrible dating profile.",
    "Explain why aliens should visit Earth.",
    "Create an excuse for being late.",
    "Describe the world's strangest restaurant.",
    "Explain why pirates make terrible teachers.",

    // Put the rest of your 100 prompts here.
];


// ============================================================
// WORDS
// ============================================================

const words = [

    // Nouns
    "wizard",
    "dragon",
    "pirate",
    "castle",
    "banana",
    "robot",
    "king",
    "queen",
    "mountain",
    "sword",
    "cat",
    "dog",
    "ship",
    "wizard",
    "treasure",

    // Verbs
    "run",
    "jump",
    "eat",
    "destroy",
    "build",
    "steal",
    "dance",
    "fight",
    "explore",
    "discover",
    "hide",
    "throw",
    "sing",
    "fly",
    "explode",

    // Adjectives
    "giant",
    "tiny",
    "angry",
    "beautiful",
    "strange",
    "dangerous",
    "ridiculous",
    "ancient",
    "magical",
    "terrible",

    // Connector words
    "the",
    "a",
    "an",
    "and",
    "but",
    "because",
    "with",
    "without",
    "very",
    "not"

];


// ============================================================
// ROOM / PLAYER VARIABLES
// ============================================================

let currentRoom = "";

let playerName = "";

let playerId = "";


// ============================================================
// GET HTML ELEMENTS
// ============================================================

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


// ============================================================
// CREATE ROOM
// ============================================================

const roomButton =
    document.getElementById("roomButton");

if (roomButton) {

    roomButton.addEventListener("click", createRoom);

}


async function createRoom() {

    console.log("Create Room clicked.");

    const nameInput =
        document.getElementById("nameInput");

    if (!nameInput) {

        console.error("nameInput was not found.");

        return;

    }

    playerName =
        nameInput.value.trim();

    if (playerName === "") {

        alert("Enter your name.");

        return;

    }


    currentRoom =
        generateRoomCode();

    playerId =
        generatePlayerId();


    try {

        await set(
            ref(
                database,
                `rooms/${currentRoom}`
            ),
            {
                prompt: "",
                state: "lobby"
            }
        );


        await set(
            ref(
                database,
                `rooms/${currentRoom}/players/${playerId}`
            ),
            {
                name: playerName
            }
        );


        console.log(
            "Room created:",
            currentRoom
        );


        window.location.href =
            `game.html?room=${currentRoom}&name=${encodeURIComponent(playerName)}&player=${playerId}`;

    }

    catch (error) {

        console.error(
            "Error creating room:",
            error
        );

        alert("Could not create room.");

    }

}


// ============================================================
// JOIN ROOM
// ============================================================

const joinRoomButton =
    document.getElementById("joinRoomButton");

if (joinRoomButton) {

    joinRoomButton.addEventListener(
        "click",
        joinRoom
    );

}


async function joinRoom() {

    console.log("Join Room clicked.");

    const roomInput =
        document.getElementById("roomInput");

    const nameInput =
        document.getElementById("nameInput");


    if (!roomInput || !nameInput) {

        console.error(
            "Room or name input not found."
        );

        return;

    }


    const roomCode =
        roomInput.value
            .trim()
            .toUpperCase();


    playerName =
        nameInput.value.trim();


    if (roomCode === "") {

        alert("Enter a room code.");

        return;

    }


    if (playerName === "") {

        alert("Enter your name.");

        return;

    }


    try {

        const snapshot =
            await get(
                child(
                    ref(database),
                    `rooms/${roomCode}`
                )
            );


        if (!snapshot.exists()) {

            alert("Room not found.");

            return;

        }


        currentRoom =
            roomCode;

        playerId =
            generatePlayerId();


        await set(
            ref(
                database,
                `rooms/${currentRoom}/players/${playerId}`
            ),
            {
                name: playerName
            }
        );


        console.log(
            "Joined room:",
            currentRoom
        );


        window.location.href =
            `game.html?room=${currentRoom}&name=${encodeURIComponent(playerName)}&player=${playerId}`;

    }

    catch (error) {

        console.error(
            "Error joining room:",
            error
        );

        alert("Could not join room.");

    }

}


// ============================================================
// ROOM CODE
// ============================================================

function generateRoomCode() {

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "";


    for (let i = 0; i < 5; i++) {

        code +=
            characters[
                Math.floor(
                    Math.random() *
                    characters.length
                )
            ];

    }


    return code;

}


// ============================================================
// PLAYER ID
// ============================================================

function generatePlayerId() {

    return Math.random()
        .toString(36)
        .substring(2, 10);

}


// ============================================================
// GET ROOM INFORMATION FROM URL
// ============================================================

function loadGameInformation() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    currentRoom =
        params.get("room") || "";


    playerName =
        params.get("name") || "";


    playerId =
        params.get("player") || "";


    console.log(
        "Room:",
        currentRoom
    );

    console.log(
        "Player:",
        playerName
    );

}


// ============================================================
// GENERATE PROMPT
// ============================================================

if (promptButton) {

    promptButton.addEventListener(
        "click",
        generatePrompt
    );

}


async function generatePrompt() {

    if (currentRoom === "") {

        alert(
            "You are not in a room."
        );

        return;

    }


    const randomPrompt =
        prompts[
            Math.floor(
                Math.random() *
                prompts.length
            )
        ];


    try {

        await set(
            ref(
                database,
                `rooms/${currentRoom}/prompt`
            ),
            randomPrompt
        );

    }

    catch (error) {

        console.error(
            "Error sending prompt:",
            error
        );

    }

}


// ============================================================
// WATCH PROMPT
// ============================================================

function watchPrompt() {

    if (
        currentRoom === "" ||
        !promptBox
    ) {

        return;

    }


    onValue(
        ref(
            database,
            `rooms/${currentRoom}/prompt`
        ),

        snapshot => {

            if (snapshot.exists()) {

                promptBox.textContent =
                    snapshot.val();

            }

        }

    );

}


// ============================================================
// GENERATE MAGNETS
// ============================================================

if (wordButton) {

    wordButton.addEventListener(
        "click",
        generateWords
    );

}


function generateWords() {

    if (!wordBank || !answerArea) {

        return;

    }


    wordBank.innerHTML = "";

    answerArea.innerHTML = "";


    const shuffled =
        [...words];


    shuffled.sort(
        () => Math.random() - 0.5
    );


    const hand =
        shuffled.slice(0, 20);


    hand.forEach(word => {

        const magnet =
            document.createElement("div");


        magnet.textContent =
            word;


        magnet.classList.add(
            "magnet"
        );


        magnet.draggable =
            true;


        magnet.addEventListener(
            "dragstart",
            dragStart
        );


        wordBank.appendChild(
            magnet
        );

    });

}


// ============================================================
// DRAG AND DROP
// ============================================================

let draggedMagnet = null;


function dragStart(event) {

    draggedMagnet =
        event.target;

}


if (wordBank && answerArea) {

    wordBank.addEventListener(
        "dragover",
        event => {

            event.preventDefault();

        }
    );


    answerArea.addEventListener(
        "dragover",
        event => {

            event.preventDefault();

        }
    );


    wordBank.addEventListener(
        "drop",
        () => {

            if (draggedMagnet) {

                wordBank.appendChild(
                    draggedMagnet
                );

            }

        }
    );


    answerArea.addEventListener(
        "drop",
        () => {

            if (draggedMagnet) {

                answerArea.appendChild(
                    draggedMagnet
                );

            }

        }
    );

}


// ============================================================
// SUBMIT ANSWER
// ============================================================

const submitButton =
    document.getElementById(
        "submitButton"
    );


if (submitButton) {

    submitButton.addEventListener(
        "click",
        submitAnswer
    );

}


async function submitAnswer() {

    if (
        currentRoom === "" ||
        playerId === ""
    ) {

        alert(
            "You are not in a room."
        );

        return;

    }


    if (!answerArea) {

        return;

    }


    const magnets =
        answerArea.querySelectorAll(
            ".magnet"
        );


    if (magnets.length === 0) {

        alert(
            "Create an answer first."
        );

        return;

    }


    const answerWords =
        Array.from(magnets)
            .map(
                magnet =>
                    magnet.textContent
            );


    const answer =
        answerWords.join(" ");


    try {

        await set(
            ref(
                database,
                `rooms/${currentRoom}/answers/${playerId}`
            ),
            {
                name: playerName,
                text: answer,
                words: answerWords
            }
        );


        console.log(
            "Answer submitted."
        );

    }

    catch (error) {

        console.error(
            "Error submitting answer:",
            error
        );

    }

}


// ============================================================
// WATCH ANSWERS
// ============================================================

function watchAnswers() {

    const answersArea =
        document.getElementById(
            "answers"
        );


    if (
        !answersArea ||
        currentRoom === ""
    ) {

        return;

    }


    onValue(
        ref(
            database,
            `rooms/${currentRoom}/answers`
        ),

        snapshot => {

            answersArea.innerHTML = "";


            if (!snapshot.exists()) {

                return;

            }


            const answers =
                snapshot.val();


            Object.values(answers)
                .forEach(answer => {

                    const answerElement =
                        document.createElement(
                            "div"
                        );


                    answerElement.classList.add(
                        "submitted-answer"
                    );


                    const nameElement =
                        document.createElement(
                            "strong"
                        );


                    nameElement.textContent =
                        answer.name + ": ";


                    const textElement =
                        document.createElement(
                            "span"
                        );


                    textElement.textContent =
                        answer.text;


                    answerElement.appendChild(
                        nameElement
                    );


                    answerElement.appendChild(
                        textElement
                    );


                    answersArea.appendChild(
                        answerElement
                    );

                });

        }

    );

}


// ============================================================
// STARTUP
// ============================================================

if (
    window.location.pathname.endsWith(
        "game.html"
    )
) {

    loadGameInformation();

    watchPrompt();

    watchAnswers();

}

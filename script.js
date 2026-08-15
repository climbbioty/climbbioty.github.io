// ======================================================
// FIREBASE
// ======================================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get,
    child,
    onValue,
    update
} from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7PpddeYPWBczMv7z-VHZ0esFwkaBNBms",
    authDomain: "ransomnoteish.firebaseapp.com",
    databaseURL: "https://ransomnoteish-default-rtdb.firebaseio.com",
    projectId: "ransomnoteish",
    storageBucket: "ransomnoteish.firebasestorage.app",
    messagingSenderId: "458933010520",
    appId: "1:458933010520:web:e3e25257bdbec3758aca2d"
};


// Start Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);


// ======================================================
// GAME VARIABLES
// ======================================================

let currentRoom = "";
let playerName = "";
let playerId = "";


// ======================================================
// WORDS AND PROMPTS
// ======================================================

// Keep your existing arrays here.
// If you already have large arrays, paste them into these.

const prompts = [
    "Something you would find in space",
    "Something that makes you angry",
    "Something you would bring to a desert island",
    "Something that should not be in your bedroom",
    "Something you would say to a teacher",
    "A terrible superhero",
    "Something you would find at a pirate ship",
    "Something that makes no sense",
    "A bad excuse for being late",
    "Something you would never want to eat"
];


const words = [
    "the",
    "a",
    "an",
    "my",
    "your",
    "very",
    "big",
    "small",
    "good",
    "bad",
    "strange",
    "funny",
    "angry",
    "happy",
    "run",
    "jump",
    "eat",
    "destroy",
    "find",
    "make",
    "want",
    "need",
    "see",
    "have",
    "is",
    "was",
    "will",
    "can",
    "because",
    "but",
    "and",
    "or",
    "with",
    "without",
    "cat",
    "dog",
    "house",
    "car",
    "pirate",
    "robot",
    "dragon",
    "king",
    "queen",
    "wizard",
    "sword",
    "mountain",
    "ocean",
    "banana"
];


// ======================================================
// GET HTML ELEMENTS
// ======================================================

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

const roomDisplay =
    document.getElementById("roomDisplay");


// ======================================================
// GENERATE PLAYER ID
// ======================================================

function generatePlayerId() {

    return Math.random()
        .toString(36)
        .substring(2, 10);

}


// ======================================================
// GENERATE ROOM CODE
// ======================================================

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


// ======================================================
// CREATE ROOM
// ======================================================

async function createRoom() {

    const nameInput =
        document.getElementById("nameInput");

    if (!nameInput) {

        console.error(
            "nameInput was not found in the HTML."
        );

        return;

    }


    playerName =
        nameInput.value.trim();


    if (playerName === "") {

        alert("Enter your name.");

        return;

    }


    // Generate a room code
    const roomCode =
        generateRoomCode();


    console.log(
        "Generated room:",
        roomCode
    );


    try {

        // Create the room in Firebase
        await set(
            ref(
                database,
                `rooms/${roomCode}`
            ),
            {
                code: roomCode,
                prompt: "",
                state: "lobby"
            }
        );


        console.log(
            "Room created in Firebase."
        );


        // Make sure the room exists
        const snapshot =
            await get(
                ref(
                    database,
                    `rooms/${roomCode}`
                )
            );


        if (!snapshot.exists()) {

            console.error(
                "Room was not found after creation."
            );

            alert(
                "The room could not be created."
            );

            return;

        }


        // Get room data
        const roomData =
            snapshot.val();


        currentRoom =
            roomData.code;


        console.log(
            "Room from Firebase:",
            currentRoom
        );


        // Create player ID
        playerId =
            generatePlayerId();


        // Add player to room
        await set(
            ref(
                database,
                `rooms/${currentRoom}/players/${playerId}`
            ),
            {
                name: playerName
            }
        );


        // Go to game page
        window.location.href =
            `game.html?room=${currentRoom}&name=${encodeURIComponent(playerName)}&player=${playerId}`;


    } catch (error) {

        console.error(
            "Error creating room:",
            error
        );

        alert(
            "There was an error creating the room."
        );

    }

}


// ======================================================
// JOIN ROOM
// ======================================================

async function joinRoom() {

    const roomInput =
        document.getElementById("roomInput");

    const nameInput =
        document.getElementById("nameInput");


    if (!roomInput || !nameInput) {

        console.error(
            "roomInput or nameInput was not found."
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

        alert(
            "Enter a room code."
        );

        return;

    }


    if (playerName === "") {

        alert(
            "Enter your name."
        );

        return;

    }


    try {

        // Look for the room in Firebase
        const snapshot =
            await get(
                child(
                    ref(database),
                    `rooms/${roomCode}`
                )
            );


        if (!snapshot.exists()) {

            alert(
                "Room not found."
            );

            return;

        }


        // Get the room data
        const roomData =
            snapshot.val();


        currentRoom =
            roomData.code;


        console.log(
            "Joined room:",
            currentRoom
        );


        // Generate player ID
        playerId =
            generatePlayerId();


        // Add player to Firebase
        await set(
            ref(
                database,
                `rooms/${currentRoom}/players/${playerId}`
            ),
            {
                name: playerName
            }
        );


        // Go to game page
        window.location.href =
            `game.html?room=${currentRoom}&name=${encodeURIComponent(playerName)}&player=${playerId}`;


    } catch (error) {

        console.error(
            "Error joining room:",
            error
        );

        alert(
            "There was an error joining the room."
        );

    }

}


// ======================================================
// GAME PAGE INFORMATION
// ======================================================

async function loadGameInformation() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const roomCode =
        params.get("room");


    playerName =
        params.get("name") || "";


    playerId =
        params.get("player") || "";


    if (!roomCode) {

        console.error(
            "No room code was provided."
        );

        return;

    }


    try {

        // Get the room directly from Firebase
        const snapshot =
            await get(
                ref(
                    database,
                    `rooms/${roomCode}`
                )
            );


        if (!snapshot.exists()) {

            console.error(
                "That room does not exist."
            );

            return;

        }


        // Get Firebase room data
        const roomData =
            snapshot.val();


        // Get actual room code from Firebase
        currentRoom =
            roomData.code;


        console.log(
            "Current room:",
            currentRoom
        );


        // Display room code
        if (roomDisplay) {

            roomDisplay.textContent =
                "Room Code: " + currentRoom;

        }


        // Display player name if you have an element for it
        const playerDisplay =
            document.getElementById(
                "playerDisplay"
            );


        if (playerDisplay) {

            playerDisplay.textContent =
                "Player: " + playerName;

        }


        // Start listening for game changes
        watchPrompt();

        watchPlayers();

        watchAnswers();


    } catch (error) {

        console.error(
            "Error loading game:",
            error
        );

    }

}


// ======================================================
// PROMPTS
// ======================================================

function generatePrompt() {

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


    // Send prompt to Firebase
    set(
        ref(
            database,
            `rooms/${currentRoom}/prompt`
        ),
        randomPrompt
    );


    console.log(
        "New prompt:",
        randomPrompt
    );

}


// ======================================================
// WATCH PROMPT
// ======================================================

function watchPrompt() {

    if (currentRoom === "") {

        return;

    }


    onValue(
        ref(
            database,
            `rooms/${currentRoom}/prompt`
        ),

        (snapshot) => {

            if (
                snapshot.exists() &&
                promptBox
            ) {

                promptBox.textContent =
                    snapshot.val();

            }

        }
    );

}


// ======================================================
// GENERATE WORDS
// ======================================================

function generateWords() {

    if (!wordBank || !answerArea) {

        return;

    }


    wordBank.innerHTML = "";

    answerArea.innerHTML = "";


    // Copy words
    const shuffled =
        [...words];


    // Shuffle
    shuffled.sort(
        () => Math.random() - 0.5
    );


    // Get 20 words
    const hand =
        shuffled.slice(0, 20);


    // Create magnets
    hand.forEach(
        (word) => {

            const magnet =
                document.createElement("div");


            magnet.textContent =
                word;


            magnet.classList.add(
                "magnet"
            );


            magnet.draggable = true;


            magnet.addEventListener(
                "dragstart",
                dragStart
            );


            wordBank.appendChild(
                magnet
            );

        }
    );

}


// ======================================================
// DRAG AND DROP
// ======================================================

let draggedMagnet = null;


function dragStart(event) {

    draggedMagnet =
        event.target;

}


// Word bank accepts drops
if (wordBank) {

    wordBank.addEventListener(
        "dragover",
        (event) => {

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

}


// Answer area accepts drops
if (answerArea) {

    answerArea.addEventListener(
        "dragover",
        (event) => {

            event.preventDefault();

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


// ======================================================
// WATCH PLAYERS
// ======================================================

function watchPlayers() {

    if (currentRoom === "") {

        return;

    }


    const playersRef =
        ref(
            database,
            `rooms/${currentRoom}/players`
        );


    onValue(
        playersRef,
        (snapshot) => {

            console.log(
                "Players:",
                snapshot.val()
            );

        }
    );

}


// ======================================================
// WATCH ANSWERS
// ======================================================

function watchAnswers() {

    if (currentRoom === "") {

        return;

    }


    const answersRef =
        ref(
            database,
            `rooms/${currentRoom}/answers`
        );


    onValue(
        answersRef,
        (snapshot) => {

            console.log(
                "Answers:",
                snapshot.val()
            );

        }
    );

}


// ======================================================
// BUTTONS
// ======================================================

// CREATE ROOM
const roomButton =
    document.getElementById(
        "roomButton"
    );


if (roomButton) {

    roomButton.addEventListener(
        "click",
        createRoom
    );

}


// JOIN ROOM
const joinRoomButton =
    document.getElementById(
        "joinRoomButton"
    );


if (joinRoomButton) {

    joinRoomButton.addEventListener(
        "click",
        joinRoom
    );

}


// GENERATE PROMPT
if (promptButton) {

    promptButton.addEventListener(
        "click",
        generatePrompt
    );

}


// GENERATE WORDS
if (wordButton) {

    wordButton.addEventListener(
        "click",
        generateWords
    );

}


// ======================================================
// STARTUP
// ======================================================

if (
    window.location.pathname.endsWith(
        "game.html"
    )
) {

    loadGameInformation();

}

// ====================
// SUBMISSIONS
// ====================

// Get the Submit Answer button
const submitAnswerButton = document.getElementById("submitAnswer");

// Get the player's name from the URL
const params = new URLSearchParams(window.location.search);
const playerName = params.get("name");

// Submit the player's answer
submitAnswerButton.addEventListener("click", async () => {

    // Get the magnets currently in the answer area
    const magnets = document.querySelectorAll("#answerArea .magnet");

    // Turn the magnets into a sentence
    const answer = Array.from(magnets)
        .map(magnet => magnet.textContent.trim())
        .join(" ");

    // Make sure there is an answer
    if (!answer) {
        console.log("No answer to submit.");
        return;
    }

    // Make sure we have a room
    if (!roomCode) {
        console.log("You are not in a room.");
        return;
    }

    // Make sure we know who submitted the answer
    if (!playerName) {
        console.log("Player name not found.");
        return;
    }

    // Save the answer to Firebase
    await update(
        ref(database, `rooms/${roomCode}/players/${playerName}`),
        {
            answer: answer
        }
    );

    console.log("Answer submitted:", answer);
});

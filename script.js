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


// ======================================================
// FIREBASE CONFIGURATION
// ======================================================

const firebaseConfig = {
    apiKey: "AIzaSyA7PpddeYPWBczMv7z-VHZ0esFwkaBNBms",
    authDomain: "ransomnoteish.firebaseapp.com",
    databaseURL: "https://ransomnoteish-default-rtdb.firebaseio.com",
    projectId: "ransomnoteish",
    storageBucket: "ransomnoteish.firebasestorage.app",
    messagingSenderId: "458933010520",
    appId: "1:458933010520:web:e3e25257bdbec3758aca2d"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


// ======================================================
// GAME VARIABLES
// ======================================================

let currentRoom = "";
let playerName = "";
let playerId = "";


// ======================================================
// WORDS
// ======================================================

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
// PROMPTS
// ======================================================

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
            "nameInput was not found."
        );

        return;
    }

    playerName =
        nameInput.value.trim();

    if (playerName === "") {

        alert("Enter your name.");

        return;
    }

    const newRoomCode =
        generateRoomCode();

    console.log(
        "Generated room:",
        newRoomCode
    );

    try {

        // Create room
        await set(
            ref(
                database,
                `rooms/${newRoomCode}`
            ),
            {
                code: newRoomCode,
                prompt: "",
                state: "lobby",
                judgeId: null,
                winner: null
            }
        );

        // Create player
        playerId =
            generatePlayerId();

        await set(
            ref(
                database,
                `rooms/${newRoomCode}/players/${playerId}`
            ),
            {
                name: playerName,
                answer: null
            }
        );

        console.log(
            "Room created:",
            newRoomCode
        );

        // Go to game
        window.location.href =
            `game.html?room=${newRoomCode}` +
            `&name=${encodeURIComponent(playerName)}` +
            `&player=${playerId}`;

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

    const enteredRoomCode =
        roomInput.value
            .trim()
            .toUpperCase();

    playerName =
        nameInput.value.trim();

    if (enteredRoomCode === "") {

        alert("Enter a room code.");

        return;
    }

    if (playerName === "") {

        alert("Enter your name.");

        return;
    }

    try {

        console.log(
            "Trying to join:",
            enteredRoomCode
        );

        const snapshot =
            await get(
                child(
                    ref(database),
                    `rooms/${enteredRoomCode}`
                )
            );

        if (!snapshot.exists()) {

            alert("Room not found.");

            return;
        }

        const roomData =
            snapshot.val();

        currentRoom =
            roomData.code;

        playerId =
            generatePlayerId();

        await set(
            ref(
                database,
                `rooms/${currentRoom}/players/${playerId}`
            ),
            {
                name: playerName,
                answer: null
            }
        );

        console.log(
            "Joined room:",
            currentRoom
        );

        window.location.href =
            `game.html?room=${currentRoom}` +
            `&name=${encodeURIComponent(playerName)}` +
            `&player=${playerId}`;

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
// LOAD GAME INFORMATION
// ======================================================

async function loadGameInformation() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const urlRoomCode =
        params.get("room");

    playerName =
        params.get("name") || "";

    playerId =
        params.get("player") || "";

    if (!urlRoomCode) {

        console.error(
            "No room code was provided."
        );

        return;
    }

    if (!playerId) {

        console.error(
            "No player ID was provided."
        );

        return;
    }

    try {

        const snapshot =
            await get(
                ref(
                    database,
                    `rooms/${urlRoomCode}`
                )
            );

        if (!snapshot.exists()) {

            console.error(
                "That room does not exist."
            );

            return;
        }

        const roomData =
            snapshot.val();

        currentRoom =
            roomData.code;

        console.log(
            "Current room:",
            currentRoom
        );

        if (roomDisplay) {

            roomDisplay.textContent =
                "Room Code: " +
                currentRoom;

        }

        const playerDisplay =
            document.getElementById(
                "playerDisplay"
            );

        if (playerDisplay) {

            playerDisplay.textContent =
                "Player: " +
                playerName;

        }

        watchPrompt();
        watchPlayers();
        watchJudge();
        watchWinner();

    } catch (error) {

        console.error(
            "Error loading game:",
            error
        );

    }

}


// ======================================================
// GENERATE PROMPT + START NEW ROUND
// ======================================================

async function generatePrompt() {

    if (currentRoom === "") {

        alert(
            "You are not in a room."
        );

        return;
    }

      winnerAlreadyShown = false;

    try {

        const playersSnapshot =
            await get(
                ref(
                    database,
                    `rooms/${currentRoom}/players`
                )
            );

        if (!playersSnapshot.exists()) {

            alert(
                "There are no players in the room."
            );

            return;
        }

        const players =
            playersSnapshot.val();

        const playerIds =
            Object.keys(players);

        if (playerIds.length < 2) {

            alert(
                "You need at least two players."
            );

            return;
        }


        // Select random judge
        const randomIndex =
            Math.floor(
                Math.random() *
                playerIds.length
            );

        const selectedJudge =
            playerIds[randomIndex];


        // Select random prompt
        const newPrompt =
            prompts[
                Math.floor(
                    Math.random() *
                    prompts.length
                )
            ];


        // Clear old round
        const updates = {};

        playerIds.forEach(
            (id) => {

                updates[
                    `rooms/${currentRoom}/players/${id}/answer`
                ] = null;

            }
        );

        updates[
            `rooms/${currentRoom}/winner`
        ] = null;


        // Start new round
        updates[
            `rooms/${currentRoom}/prompt`
        ] = newPrompt;

        updates[
            `rooms/${currentRoom}/judgeId`
        ] = selectedJudge;

        updates[
            `rooms/${currentRoom}/state`
        ] = "answering";


        await update(
            ref(database),
            updates
        );


        console.log(
            "New round started."
        );

        console.log(
            "Prompt:",
            newPrompt
        );

        console.log(
            "Judge:",
            selectedJudge
        );

    } catch (error) {

        console.error(
            "Error generating prompt:",
            error
        );

    }

}


// ======================================================
// WATCH PROMPT
// ======================================================

function watchPrompt() {

    if (currentRoom === "") {
        return;
    }

    const promptRef =
        ref(
            database,
            `rooms/${currentRoom}/prompt`
        );

    onValue(
        promptRef,
        (snapshot) => {

            if (!snapshot.exists()) {
                return;
            }

            const promptText =
                snapshot.val();

            const promptElement =
                document.getElementById(
                    "promptBox"
                ) ||
                document.getElementById(
                    "promptText"
                ) ||
                document.getElementById(
                    "judgePrompt"
                );

            if (promptElement) {

                promptElement.textContent =
                    promptText;

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

    const shuffled =
        [...words];

    shuffled.sort(
        () => Math.random() - 0.5
    );

    const hand =
        shuffled.slice(0, 20);

    hand.forEach(
        (word) => {

            const magnet =
                document.createElement(
                    "div"
                );

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


// ======================================================
// WORD BANK DROP
// ======================================================

if (wordBank) {

    wordBank.addEventListener(
        "dragover",
        (event) => {

            event.preventDefault();

        }
    );

    wordBank.addEventListener(
        "drop",
        (event) => {

            event.preventDefault();

            if (draggedMagnet) {

                wordBank.appendChild(
                    draggedMagnet
                );

            }

            draggedMagnet = null;

        }
    );

}


// ======================================================
// ANSWER AREA DROP
// ======================================================

if (answerArea) {

    answerArea.addEventListener(
        "dragover",
        (event) => {

            event.preventDefault();

        }
    );

    answerArea.addEventListener(
        "drop",
        (event) => {

            event.preventDefault();

            if (draggedMagnet) {

                answerArea.appendChild(
                    draggedMagnet
                );

            }

            draggedMagnet = null;

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
// SUBMIT ANSWER
// ======================================================

const submitAnswerButton =
    document.getElementById(
        "submitAnswer"
    );

if (submitAnswerButton) {

    submitAnswerButton.addEventListener(
        "click",
        async () => {

            console.log(
                "SUBMIT BUTTON CLICKED"
            );

            if (currentRoom === "") {

                console.log(
                    "NO ROOM"
                );

                return;
            }

            if (playerId === "") {

                console.log(
                    "NO PLAYER ID"
                );

                return;
            }

            const magnets =
                document.querySelectorAll(
                    "#answerArea .magnet"
                );

            const answer =
                Array.from(magnets)
                    .map(
                        (magnet) =>
                            magnet.textContent.trim()
                    )
                    .join(" ");

            console.log(
                "Answer:",
                answer
            );

            if (answer === "") {

                alert(
                    "Create an answer before submitting."
                );

                return;
            }

            try {

                await update(
                    ref(
                        database,
                        `rooms/${currentRoom}/players/${playerId}`
                    ),
                    {
                        answer: answer
                    }
                );

                console.log(
                    "ANSWER SUBMITTED"
                );

                submitAnswerButton.disabled =
                    true;

                submitAnswerButton.textContent =
                    "Answer Submitted";

            } catch (error) {

                console.error(
                    "Error submitting answer:",
                    error
                );

            }

        }
    );

}


// ======================================================
// WATCH JUDGE
// ======================================================

function watchJudge() {

    if (
        currentRoom === "" ||
        playerId === ""
    ) {
        return;
    }

    const roomRef =
        ref(
            database,
            `rooms/${currentRoom}`
        );

    onValue(
        roomRef,
        (snapshot) => {

            const room =
                snapshot.val();

            if (!room) {
                return;
            }

            const selectedJudge =
                room.judgeId;

            console.log(
                "Current judge:",
                selectedJudge
            );

            if (
                selectedJudge === playerId &&
                room.state === "answering" &&
                !window.location.pathname.endsWith(
                    "judge.html"
                )
            ) {

                console.log(
                    "I am the judge."
                );

                window.location.replace(
                    `judge.html?room=${currentRoom}` +
                    `&player=${playerId}` +
                    `&name=${encodeURIComponent(playerName)}`
                );

            }

        }
    );

}


// ======================================================
// LOAD JUDGE ROOM
// ======================================================

async function loadJudgeRoom() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    currentRoom =
        params.get("room");

    playerId =
        params.get("player");

    playerName =
        params.get("name") || "";

    console.log(
        "Loading judge room:",
        currentRoom
    );

    console.log(
        "Judge player ID:",
        playerId
    );

    if (
        !currentRoom ||
        !playerId
    ) {

        console.error(
            "Missing room or player information."
        );

        return;
    }

    try {

        const snapshot =
            await get(
                ref(
                    database,
                    `rooms/${currentRoom}`
                )
            );

        if (!snapshot.exists()) {

            console.error(
                "Room does not exist."
            );

            return;
        }

        const room =
            snapshot.val();

        if (
            room.judgeId !== playerId
        ) {

            console.error(
                "This player is not the judge."
            );

            return;
        }

        console.log(
            "Confirmed: this player is the judge."
        );

        watchJudgePrompt(
            currentRoom
        );

        watchJudgeAnswers(
            currentRoom,
            playerId
        );

        watchJudgeWinner();

    } catch (error) {

        console.error(
            "Error loading judge room:",
            error
        );

    }

}


// ======================================================
// WATCH JUDGE PROMPT
// ======================================================

function watchJudgePrompt(
    judgeRoomCode
) {

    const promptRef =
        ref(
            database,
            `rooms/${judgeRoomCode}/prompt`
        );

    onValue(
        promptRef,
        (snapshot) => {

            if (!snapshot.exists()) {
                return;
            }

            const promptText =
                snapshot.val();

            const promptElement =
                document.getElementById(
                    "judgePrompt"
                ) ||
                document.getElementById(
                    "promptBox"
                ) ||
                document.getElementById(
                    "promptText"
                );

            if (promptElement) {

                promptElement.textContent =
                    promptText;

            }

            console.log(
                "Judge prompt:",
                promptText
            );

        }
    );

}


// ======================================================
// WATCH JUDGE ANSWERS
// ======================================================

function watchJudgeAnswers(
    judgeRoomCode,
    judgePlayerId
) {

    const playersRef =
        ref(
            database,
            `rooms/${judgeRoomCode}/players`
        );

    onValue(
        playersRef,
        (snapshot) => {

            const players =
                snapshot.val();

            if (!players) {
                return;
            }

            // Everyone except judge
            const contestants =
                Object.entries(
                    players
                ).filter(
                    ([id]) =>
                        id !== judgePlayerId
                );

            // Only players with answers
            const submittedPlayers =
                contestants.filter(
                    ([id, player]) =>
                        player.answer &&
                        player.answer
                            .toString()
                            .trim() !== ""
                );

            const statusElement =
                document.getElementById(
                    "answerStatus"
                );

            if (statusElement) {

                statusElement.textContent =
                    `${submittedPlayers.length} of ` +
                    `${contestants.length} players have submitted.`;

            }

            console.log(
                "Submitted:",
                submittedPlayers.length,
                "of",
                contestants.length
            );

            // Wait until everyone answers
            if (
                submittedPlayers.length <
                contestants.length
            ) {

                clearJudgeAnswers();

                return;
            }

            // Everyone answered
            displayJudgeAnswers(
                submittedPlayers,
                judgeRoomCode
            );

        }
    );

}


// ======================================================
// CLEAR JUDGE ANSWERS
// ======================================================

function clearJudgeAnswers() {

    const container =
        document.getElementById(
            "answersContainer"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

}


// ======================================================
// DISPLAY JUDGE ANSWERS
// ======================================================

function displayJudgeAnswers(
    submittedPlayers,
    judgeRoomCode
) {

    const container =
        document.getElementById(
            "answersContainer"
        );

    if (!container) {

        console.error(
            "answersContainer was not found."
        );

        return;
    }

    const template =
        document.getElementById(
            "answerTemplate"
        );

    container.innerHTML = "";

    submittedPlayers.forEach(
        ([playerId, player]) => {

            let answerCard;


            // Use template if available
            if (template) {

                answerCard =
                    template.content
                        .cloneNode(true);

            }


            // Otherwise build one
            else {

                answerCard =
                    document.createElement(
                        "div"
                    );

                answerCard.classList.add(
                    "answerCard"
                );

                const answerText =
                    document.createElement(
                        "p"
                    );

                answerText.classList.add(
                    "answerText"
                );

                const chooseButton =
                    document.createElement(
                        "button"
                    );

                chooseButton.classList.add(
                    "chooseAnswer"
                );

                chooseButton.textContent =
                    "Choose This Answer";

                answerCard.appendChild(
                    answerText
                );

                answerCard.appendChild(
                    chooseButton
                );

            }


            const answerText =
                answerCard.querySelector(
                    ".answerText"
                );

            const chooseButton =
                answerCard.querySelector(
                    ".chooseAnswer"
                );


            if (answerText) {

                answerText.textContent =
                    player.answer;

            }


            if (chooseButton) {

                chooseButton.addEventListener(
                    "click",
                    () => {

                        chooseWinner(
                            judgeRoomCode,
                            playerId
                        );

                    }
                );

            }


            container.appendChild(
                answerCard
            );

        }
    );

}


// ======================================================
// CHOOSE WINNER
// ======================================================

async function chooseWinner(
    judgeRoomCode,
    winningPlayerId
) {

    try {

        await update(
            ref(
                database,
                `rooms/${judgeRoomCode}`
            ),
            {
                winner:
                    winningPlayerId,

                state:
                    "winner"
            }
        );

        console.log(
            "Winner selected:",
            winningPlayerId
        );

        const buttons =
            document.querySelectorAll(
                ".chooseAnswer"
            );

        buttons.forEach(
            (button) => {

                button.disabled =
                    true;

            }
        );

    } catch (error) {

        console.error(
            "Error selecting winner:",
            error
        );

    }

}


// ======================================================
// WATCH WINNER
// ======================================================

let winnerAlreadyShown = false;

function watchWinner() {

    if (
        currentRoom === "" ||
        playerId === ""
    ) {
        return;
    }

    const roomRef =
        ref(
            database,
            `rooms/${currentRoom}`
        );

    onValue(
        roomRef,
        (snapshot) => {

            const room =
                snapshot.val();

            if (!room) {
                return;
            }

            // Only act after a winner is chosen
            if (room.state !== "winner") {
                return;
            }

            const winningPlayerId =
                room.winner;

            if (!winningPlayerId) {
                return;
            }

            const winningPlayer =
                room.players &&
                room.players[winningPlayerId];

            if (!winningPlayer) {
                return;
            }

            // Prevent the same winner from being
            // displayed again and again.
            if (winnerAlreadyShown) {
                return;
            }

            winnerAlreadyShown = true;

            const winningPlayerName =
                winningPlayer.name;

            const winningAnswer =
                winningPlayer.answer;

            console.log(
                "Winner:",
                winningPlayerName
            );

            console.log(
                "Winning answer:",
                winningAnswer
            );

            // Display winner once
            showWinner(
                winningPlayerName,
                winningAnswer
            );

            // If I am the judge, return to the game
            if (
                room.judgeId === playerId
            ) {

                console.log(
                    "I am the judge. Returning to game room..."
                );

                setTimeout(
                    () => {

                        window.location.replace(
                            `game.html?room=${currentRoom}` +
                            `&name=${encodeURIComponent(playerName)}` +
                            `&player=${playerId}`
                        );

                    },
                    3000
                );

            }

        }
    );

}
// ======================================================
// WATCH JUDGE WINNER
// ======================================================

function watchJudgeWinner() {

    if (
        currentRoom === "" ||
        playerId === ""
    ) {

        return;
    }

    const roomRef =
        ref(
            database,
            `rooms/${currentRoom}`
        );

    onValue(
        roomRef,
        (snapshot) => {

            const room =
                snapshot.val();

            if (!room) {
                return;
            }

            if (
                room.state !== "winner"
            ) {

                return;
            }

            console.log(
                "Judge detected winner. Returning to game."
            );

            setTimeout(
                () => {

                    window.location.replace(
                        `game.html?room=${currentRoom}` +
                        `&name=${encodeURIComponent(playerName)}` +
                        `&player=${playerId}`
                    );

                },
                3000
            );

        }
    );

}


// ======================================================
// SHOW WINNER
// ======================================================

function showWinner(
    winningPlayerName,
    winningAnswer
) {

    let winnerDisplay =
        document.getElementById(
            "winnerDisplay"
        );


    // Create it automatically if needed
    if (!winnerDisplay) {

        winnerDisplay =
            document.createElement(
                "div"
            );

        winnerDisplay.id =
            "winnerDisplay";

        document.body.prepend(
            winnerDisplay
        );

    }


    winnerDisplay.innerHTML = "";


    const title =
        document.createElement(
            "h2"
        );

    title.textContent =
        "Winner!";


    const name =
        document.createElement(
            "h3"
        );

    name.textContent =
        winningPlayerName;


    const answer =
        document.createElement(
            "p"
        );

    answer.textContent =
        `"${winningAnswer}"`;


    winnerDisplay.appendChild(
        title
    );

    winnerDisplay.appendChild(
        name
    );

    winnerDisplay.appendChild(
        answer
    );


    console.log(
        "Winner displayed."
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

// GAME PAGE
if (
    window.location.pathname.endsWith(
        "game.html"
    )
) {

    loadGameInformation();

}


// JUDGE PAGE
if (
    window.location.pathname.endsWith(
        "judge.html"
    )
) {

    loadJudgeRoom();

}

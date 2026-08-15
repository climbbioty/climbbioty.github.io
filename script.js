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


// ============================================================
// PROMPTS
// ============================================================

const prompts = [
"Explain why you are banned from a restaurant.",
"Write a terrible excuse for being late.",
"Explain why your neighbor is suspicious.",
"Write a message found inside a mysterious box.",
"Explain why you should be the next king.",
"Describe your evil plan.",
"Explain why your plan failed.",
"Write an apology to everyone in the room.",
"Explain why you cannot be trusted.",
"Write a warning to future generations.",
"Explain why your pet became famous.",
"Describe your most embarrassing achievement.",
"Explain why you were removed from a competition.",
"Write a message from your evil twin.",
"Explain why you accidentally saved the world.",
"Describe your secret identity.",
"Explain why you are hiding in a bathroom.",
"Write a complaint about your own life.",
"Explain why you challenged a wizard.",
"Describe your greatest discovery.",
"Write a message from a confused alien.",
"Explain why aliens should avoid Earth.",
"Describe your new invention.",
"Explain why your invention is dangerous.",
"Write instructions for using a ridiculous machine.",
"Explain why your robot malfunctioned.",
"Describe your dream vacation gone wrong.",
"Explain why you cannot leave your house.",
"Write a letter from your future self.",
"Explain why your future self is disappointed.",
"Describe your fantasy kingdom.",
"Explain why your castle has a strange rule.",
"Write an announcement from a king.",
"Explain why the dragon chose you.",
"Describe your legendary weapon.",
"Explain why your sword is embarrassing.",
"Write a message from a magical creature.",
"Explain why you joined a quest.",
"Describe your unusual magical power.",
"Explain why your spell failed.",
"Write a pirate captain's announcement.",
"Explain why your pirate crew quit.",
"Describe your hidden treasure.",
"Explain why your treasure is worthless.",
"Write a message found in a bottle.",
"Explain why you became a pirate.",
"Describe your worst adventure.",
"Explain why your ship disappeared.",
"Write a pirate's apology letter.",
"Explain why you were kicked off your ship.",
"Describe your strange new business.",
"Explain why nobody should buy your product.",
"Write an advertisement for something ridiculous.",
"Explain why your company went bankrupt.",
"Describe your terrible invention idea.",
"Write a five-star review for something awful.",
"Explain why your restaurant failed.",
"Describe your unusual job.",
"Explain why you were fired.",
"Write a message to your angry customers.",
"Explain why you are being chased.",
"Describe your escape plan.",
"Write a message to your enemy.",
"Explain why your enemy became your friend.",
"Describe your secret hideout.",
"Explain why your hiding place was discovered.",
"Write a villain's speech.",
"Explain why you became a villain.",
"Describe your heroic comeback.",
"Explain why everyone misunderstood you.",
"Write a message from a ghost.",
"Explain why a ghost is bothering you.",
"Describe your haunted house.",
"Explain why the monster is friendly.",
"Write a monster's diary entry.",
"Explain why you adopted a monster.",
"Describe your strangest roommate.",
"Explain why your house moved.",
"Write a message from a talking animal.",
"Explain why animals are angry.",
"Describe your weirdest dream.",
"Explain why your dream became real.",
"Write a message from the moon.",
"Explain why the moon is upset.",
"Describe your trip through space.",
"Explain why your spaceship crashed.",
"Write a message from another planet.",
"Explain why you cannot return home.",
"Describe your new planet.",
"Explain why your planet needs help.",
"Write a ridiculous excuse.",
"Explain why everyone is confused.",
"Describe your greatest failure.",
"Explain why you celebrated too early.",
"Write a dramatic announcement.",
"Explain why something completely normal became dangerous.",
"Describe your unusual hobby.",
"Explain why your hobby scares people.",
"Write a message to your younger self.",
"Explain why your younger self made a mistake."
];


// ============================================================
// WORDS
// ============================================================

const words = [
    "apple", "banana", "pizza", "dragon", "wizard",
    "pirate", "robot", "alien", "ghost", "monster",
    "unicorn", "castle", "tower", "forest", "mountain",
    "river", "ocean", "island", "cave", "volcano",
    "moon", "star", "planet", "spaceship", "rocket",
    "computer", "phone", "book", "map", "key",
    "door", "chair", "table", "bed", "pillow",
    "blanket", "shoe", "hat", "sword", "shield",
    "helmet", "armor", "crown", "ring", "coin",
    "treasure", "diamond", "gold", "cookie", "cake",
    "sandwich", "taco", "cheese", "pickle", "chicken",
    "cow", "dog", "cat", "fish", "bird",
    "mouse", "frog", "horse", "dragonfly", "bee",
    "spider", "snake", "turtle", "tree", "flower",
    "leaf", "rock", "cloud", "storm", "fire",
    "water", "ice", "shadow", "light", "song",
    "dance", "movie", "game", "story", "letter",
    "picture", "camera", "paint", "toy", "ball",
    "rope", "box", "bag", "keyhole", "clock",
    "mirror", "mask", "king", "queen", "soldier",
    "captain", "doctor", "teacher",

    // Verbs
    "run", "jump", "walk", "fly", "swim",
    "climb", "crawl", "dance", "sing", "laugh",
    "cry", "smile", "shout", "whisper", "eat",
    "drink", "cook", "bake", "burn", "freeze",
    "explode", "break", "build", "create", "destroy",
    "fix", "throw", "catch", "kick", "punch",
    "push", "pull", "open", "close", "lock",
    "unlock", "find", "hide", "seek", "steal",
    "give", "take", "buy", "sell", "trade",
    "carry", "drop", "lift", "fall", "sleep",
    "wake", "dream", "think", "know", "forget",
    "remember", "learn", "teach", "read", "write",
    "draw", "paint", "play", "fight", "win",
    "lose", "help", "save", "attack", "defend",
    "protect", "escape", "chase", "follow", "lead",
    "become", "change", "grow", "shrink", "transform",
    "discover", "explore", "travel", "visit", "invent",
    "charge", "control", "summon", "wear", "remove",
    "mix", "spill",

    // Adjectives
    "tiny", "giant", "huge", "small", "purple",
    "green", "blue", "red", "golden", "silver",
    "ancient", "modern", "magical", "mysterious",
    "angry", "happy", "sad", "silly", "strange",
    "weird", "funny", "scary", "friendly", "evil",
    "good", "lazy", "fast", "slow", "loud",
    "quiet", "flying", "broken", "secret", "hidden",
    "bright", "dark", "cold", "hot", "spicy",
    "sweet", "sticky", "fuzzy", "sharp", "soft",
    "heavy", "light", "crazy", "wild", "royal",
    "legendary",

    // Connectors
    "the", "a", "an", "my", "your",
    "his", "her", "our", "their", "this",
    "that", "these", "those", "and", "or",
    "but", "because", "with", "without", "from",
    "to", "for", "at", "by", "about",
    "into", "inside", "outside", "over", "under",
    "through", "after", "before", "while", "when",
    "where", "who", "what", "how", "very",
    "really", "almost", "never", "always", "maybe",
    "not", "only", "also", "then", "so"
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
                return snapshot.val();
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

        roomCodeDisplay.textContent =
            "Room Code: " + snapshot.val();

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

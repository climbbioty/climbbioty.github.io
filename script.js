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
  // Nouns
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


// ======================================================
// PROMPTS
// ======================================================

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
    watchRoundResults();

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

    displayedWinnerId = null;

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

  }

  catch (error) {

    console.error(
      "Error generating prompt:",
      error
    );

  }

}

// ======================================================
// REFRESH PROMPT
// ======================================================

async function getNewPrompt() {

  if (currentRoom === "") {

    alert("You are not in a room.");

    return;
  }

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

  try {

    const newPrompt =
      prompts[
      Math.floor(
        Math.random() *
        prompts.length
      )
      ];

    await update(
      ref(database),
      {
        [`rooms/${currentRoom}/prompt`]:
          newPrompt
      }
    );

    console.log(
      "Prompt:",
      newPrompt
    );

  } catch (error) {

    console.error(
      "Error refreshing prompt:",
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

      if (!promptText || promptText.toString().trim() === "") {
        return;
      }

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

      // Reset submit button for new round
      if (submitAnswerButton) {

        submitAnswerButton.disabled =
          false;

        submitAnswerButton.textContent =
          "Submit Answer";

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

  const shuffled = [...words];

  shuffled.sort(
    () => Math.random() - 0.5
  );

  const hand = shuffled.slice(0, 40);

  hand.forEach((word) => {

    const magnet =
      document.createElement("div");

    magnet.textContent = word;

    magnet.classList.add("magnet");

    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches;

    if (
      window.matchMedia(
        "(pointer: coarse)"
      ).matches
    ) {

      // Phone/tablet
      magnet.draggable =
        false;

      magnet.addEventListener(
        "pointerdown",
        mobileDragStart
      );

    } else {

      // Computer
      magnet.draggable =
        true;

      magnet.addEventListener(
        "dragstart",
        desktopDragStart
      );

    }

    wordBank.appendChild(magnet);

  });
}

// ======================================================
// MAGNET DRAGGING
// FREE PLACEMENT VERSION
// ======================================================


// ======================================================
// COMPUTER DRAGGING
// ======================================================

let desktopDraggedMagnet = null;


// Start desktop drag
function desktopDragStart(event) {

  desktopDraggedMagnet =
    event.currentTarget;

  if (event.dataTransfer) {

    event.dataTransfer.effectAllowed =
      "move";

  }

}


// ------------------------------------------------------
// Drop on answer area
// ------------------------------------------------------

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

      if (!desktopDraggedMagnet) {
        return;
      }


      const magnet =
        desktopDraggedMagnet;


      const answerRect =
        answerArea.getBoundingClientRect();


      const magnetRect =
        magnet.getBoundingClientRect();


      // Position relative to answer area
      let x =
        event.clientX -
        answerRect.left -
        magnetRect.width / 2;


      let y =
        event.clientY -
        answerRect.top -
        magnetRect.height / 2;


      // Keep magnet inside answer area
      const maxX =
        answerArea.clientWidth -
        magnetRect.width;

      const maxY =
        answerArea.clientHeight -
        magnetRect.height;


      x =
        Math.max(
          0,
          Math.min(x, maxX)
        );

      y =
        Math.max(
          0,
          Math.min(y, maxY)
        );


      // Move magnet into answer area
      answerArea.appendChild(
        magnet
      );


      magnet.style.position =
        "absolute";

      magnet.style.left =
        x + "px";

      magnet.style.top =
        y + "px";

      magnet.style.margin =
        "0";


      desktopDraggedMagnet =
        null;

    }
  );

}


// ------------------------------------------------------
// Drop back into word bank
// ------------------------------------------------------

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

      if (!desktopDraggedMagnet) {
        return;
      }


      const magnet =
        desktopDraggedMagnet;


      wordBank.appendChild(
        magnet
      );


      // Return normal word-bank styling
      magnet.style.position =
        "";

      magnet.style.left =
        "";

      magnet.style.top =
        "";

      magnet.style.margin =
        "";


      desktopDraggedMagnet =
        null;

    }
  );

}


// ======================================================
// PHONE DRAGGING
// ======================================================

let mobileDraggedMagnet = null;
let mobileDragging = false;
let mobilePointerId = null;

let mobileOffsetX = 0;
let mobileOffsetY = 0;

let mobileOriginalParent = null;
let mobileOriginalNextSibling = null;


// ======================================================
// START MOBILE DRAG
// ======================================================

function mobileDragStart(event) {

  if (
    event.pointerType !== "touch"
  ) {
    return;
  }


  event.preventDefault();


  const magnet =
    event.currentTarget;


  // Prevent native HTML dragging
  magnet.draggable =
    false;


  mobileDraggedMagnet =
    magnet;

  mobileDragging =
    true;

  mobilePointerId =
    event.pointerId;


  // Remember exactly where
  // the finger grabbed the magnet
  const rect =
    magnet.getBoundingClientRect();


  mobileOffsetX =
    event.clientX -
    rect.left;

  mobileOffsetY =
    event.clientY -
    rect.top;


  // Remember original location
  mobileOriginalParent =
    magnet.parentNode;

  mobileOriginalNextSibling =
    magnet.nextSibling;


  // Take magnet out of normal layout
  magnet.style.position =
    "fixed";

  magnet.style.left =
    rect.left + "px";

  magnet.style.top =
    rect.top + "px";

  magnet.style.width =
    rect.width + "px";

  magnet.style.height =
    rect.height + "px";

  magnet.style.margin =
    "0";

  magnet.style.zIndex =
    "10000";

  magnet.style.opacity =
    "1";

  magnet.style.pointerEvents =
    "none";


  magnet.setPointerCapture(
    event.pointerId
  );

}


// ======================================================
// MOVE MOBILE MAGNET
// ======================================================

function mobileDragMove(event) {

  if (
    !mobileDragging ||
    event.pointerId !== mobilePointerId
  ) {
    return;
  }


  event.preventDefault();


  // Move the ACTUAL magnet.
  // Nothing else in the answer area moves.
  mobileDraggedMagnet.style.left =
    (
      event.clientX -
      mobileOffsetX
    ) + "px";

  mobileDraggedMagnet.style.top =
    (
      event.clientY -
      mobileOffsetY
    ) + "px";

}


// ======================================================
// END MOBILE DRAG
// ======================================================

function mobileDragEnd(event) {

  if (
    !mobileDragging ||
    event.pointerId !== mobilePointerId
  ) {
    return;
  }


  event.preventDefault();


  const magnet =
    mobileDraggedMagnet;


  if (!magnet) {
    return;
  }


  // See what is underneath
  // the finger at release
  const element =
    document.elementFromPoint(
      event.clientX,
      event.clientY
    );


  // ==================================================
  // DROPPED IN ANSWER AREA
  // ==================================================

  if (
    answerArea &&
    answerArea.contains(element)
  ) {

    const answerRect =
      answerArea.getBoundingClientRect();


    const magnetRect =
      magnet.getBoundingClientRect();


    let x =
      magnetRect.left -
      answerRect.left;


    let y =
      magnetRect.top -
      answerRect.top;


    // Keep magnet inside answer area
    const maxX =
      answerArea.clientWidth -
      magnetRect.width;


    const maxY =
      answerArea.clientHeight -
      magnetRect.height;


    x =
      Math.max(
        0,
        Math.min(x, maxX)
      );

    y =
      Math.max(
        0,
        Math.min(y, maxY)
      );


    answerArea.appendChild(
      magnet
    );


    magnet.style.position =
      "absolute";

    magnet.style.left =
      x + "px";

    magnet.style.top =
      y + "px";

    magnet.style.width =
      "";

    magnet.style.height =
      "";

    magnet.style.margin =
      "0";

    magnet.style.zIndex =
      "";

    magnet.style.opacity =
      "";

    magnet.style.pointerEvents =
      "";


  }


  // ==================================================
  // DROPPED IN WORD BANK
  // ==================================================

  else if (
    wordBank &&
    wordBank.contains(element)
  ) {

    wordBank.appendChild(
      magnet
    );


    magnet.style.position =
      "";

    magnet.style.left =
      "";

    magnet.style.top =
      "";

    magnet.style.width =
      "";

    magnet.style.height =
      "";

    magnet.style.margin =
      "";

    magnet.style.zIndex =
      "";

    magnet.style.opacity =
      "";

    magnet.style.pointerEvents =
      "";

  }


  // ==================================================
  // DROPPED SOMEWHERE INVALID
  // ==================================================

  else {

    if (
      mobileOriginalNextSibling &&
      mobileOriginalNextSibling.parentNode ===
      mobileOriginalParent
    ) {

      mobileOriginalParent.insertBefore(
        magnet,
        mobileOriginalNextSibling
      );

    }

    else if (
      mobileOriginalParent
    ) {

      mobileOriginalParent.appendChild(
        magnet
      );

    }


    // Restore normal styling
    magnet.style.position =
      "";

    magnet.style.left =
      "";

    magnet.style.top =
      "";

    magnet.style.width =
      "";

    magnet.style.height =
      "";

    magnet.style.margin =
      "";

    magnet.style.zIndex =
      "";

    magnet.style.opacity =
      "";

    magnet.style.pointerEvents =
      "";

  }


  // Reset variables
  mobileDraggedMagnet =
    null;

  mobileDragging =
    false;

  mobilePointerId =
    null;

  mobileOriginalParent =
    null;

  mobileOriginalNextSibling =
    null;

  mobileOffsetX =
    0;

  mobileOffsetY =
    0;

}


// ======================================================
// CANCEL MOBILE DRAG
// ======================================================

function mobileDragCancel(event) {

  if (
    !mobileDragging ||
    event.pointerId !== mobilePointerId
  ) {
    return;
  }


  mobileDragEnd(event);

}


// ======================================================
// MOBILE POINTER EVENTS
// ======================================================

document.addEventListener(
  "pointermove",
  mobileDragMove,
  { passive: false }
);


document.addEventListener(
  "pointerup",
  mobileDragEnd,
  { passive: false }
);


document.addEventListener(
  "pointercancel",
  mobileDragCancel,
  { passive: false }
);


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
        Array.from(
          document.querySelectorAll(
            "#answerArea .magnet"
          )
        );


      magnets.sort(
        (a, b) => {

          const aRect =
            a.getBoundingClientRect();

          const bRect =
            b.getBoundingClientRect();


          const verticalDifference =
            Math.abs(
              aRect.top -
              bRect.top
            );


          // If they are on approximately
          // the same row, sort left to right
          if (
            verticalDifference < 25
          ) {

            return (
              aRect.left -
              bRect.left
            );

          }


          // Otherwise sort top to bottom
          return (
            aRect.top -
            bRect.top
          );

        }
      );


      const answer =
        magnets
          .map(
            magnet =>
              magnet.textContent.trim()
          )
          .join(" ");

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

    watchCurrentJudge();

    watchJudgePrompt(
      currentRoom
    );

    watchJudgeAnswers(
      currentRoom,
      playerId
    );

  } catch (error) {

    console.error(
      "Error loading judge room:",
      error
    );

  }

}

// ======================================================
// WATCH CURRENT JUDGE
// ======================================================

function watchCurrentJudge() {

  if (
    currentRoom === "" ||
    playerId === ""
  ) {
    return;
  }

  const roomRef = ref(
    database,
    `rooms/${currentRoom}`
  );

  onValue(
    roomRef,
    (snapshot) => {

      const room = snapshot.val();

      if (!room) {
        return;
      }

      const currentJudgeId =
        room.judgeId;

      // This player is no longer the judge
      if (
        currentJudgeId !== playerId
      ) {

        console.log(
          "This player is no longer the judge."
        );

        window.location.replace(
          `game.html?room=${currentRoom}` +
          `&name=${encodeURIComponent(playerName)}` +
          `&player=${playerId}`
        );

      }

    }
  );

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
        winner: winningPlayerId,
        state: "winner"
      }
    );

    console.log(
      "Winner selected:",
      winningPlayerId
    );

    document
      .querySelectorAll(".chooseAnswer")
      .forEach((button) => {
        button.disabled = true;
      });

    window.location.replace(
      `game.html?room=${judgeRoomCode}` +
      `&name=${encodeURIComponent(playerName)}` +
      `&player=${playerId}`
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

let displayedWinnerId = null;

function watchWinner() {

  if (
    currentRoom === "" ||
    playerId === ""
  ) {
    return;
  }

  const winnerRef = ref(
    database,
    `rooms/${currentRoom}/winner`
  );

  onValue(
    winnerRef,
    async (snapshot) => {

      const winningPlayerId =
        snapshot.val();

      // No winner yet
      if (!winningPlayerId) {
        return;
      }

      // Already displayed this winner
      if (
        winningPlayerId ===
        displayedWinnerId
      ) {
        return;
      }

      displayedWinnerId =
        winningPlayerId;

      // Get the player's information
      const playerSnapshot =
        await get(
          ref(
            database,
            `rooms/${currentRoom}/players/${winningPlayerId}`
          )
        );

      if (!playerSnapshot.exists()) {
        console.error(
          "Winning player could not be found."
        );

        return;
      }

      const winningPlayer =
        playerSnapshot.val();

      console.log(
        "Winner:",
        winningPlayer.name
      );

      console.log(
        "Winning answer:",
        winningPlayer.answer
      );

      showWinner(
        winningPlayer.name,
        winningPlayer.answer
      );

    }
  );

}

// ======================================================
// WATCH ROUND RESULTS
// ======================================================

function watchRoundResults() {

  if (currentRoom === "") {
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

      const results =
        document.getElementById(
          "roundResults"
        );

      if (!results) {
        return;
      }


      // New round has started
      if (room.state === "answering") {

        results.innerHTML = "";

        results.style.display =
          "none";

        return;
      }


      // Don't show results yet
      if (
        room.state !== "winner" ||
        !room.winner ||
        !room.players
      ) {

        return;
      }


      // Show results
      results.innerHTML = "";

      results.style.display =
        "block";


      const title =
        document.createElement("h2");

      title.textContent =
        "Round Results";

      results.appendChild(
        title
      );


      // Get all players except the judge
      const contestants =
        Object.entries(
          room.players
        ).filter(
          ([id]) =>
            id !== room.judgeId
        );


      contestants.forEach(
        ([playerId, player]) => {

          const answerCard =
            document.createElement(
              "div"
            );

          answerCard.classList.add(
            "roundResultCard"
          );


          const name =
            document.createElement(
              "h3"
            );

          name.textContent =
            player.name;


          const answer =
            document.createElement(
              "p"
            );

          answer.textContent =
            player.answer ||
            "No answer";


          // Highlight winner
          if (
            playerId === room.winner
          ) {

            answerCard.classList.add(
              "winningAnswer"
            );

            const winnerLabel =
              document.createElement(
                "strong"
              );

            winnerLabel.textContent =
              "WINNER";

            answerCard.appendChild(
              winnerLabel
            );

          }


          answerCard.appendChild(
            name
          );

          answerCard.appendChild(
            answer
          );


          results.appendChild(
            answerCard
          );

        }
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

const refreshPrompt =
  document.getElementById(
    "refreshPrompt"
  );

if (promptButton) {
  refreshPrompt.addEventListener(
    "click",
    getNewPrompt
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

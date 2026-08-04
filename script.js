// ---------- Prompt List ----------

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

// ---------- Word List ----------

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

// ---------- Get HTML Elements ----------

const promptBox = document.getElementById("promptBox");
const promptButton = document.getElementById("promptButton");
const wordBank = document.getElementById("wordBank");
const answerArea = document.getElementById("answerArea");

// ---------- Generate Prompt ----------

// Generate a new prompt only

promptButton.addEventListener("click", () => {

    const randomPrompt =
        prompts[Math.floor(Math.random()*prompts.length)];

    promptBox.textContent = randomPrompt;

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

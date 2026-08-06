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


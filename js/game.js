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

const routineBtn = document.getElementById("routinebtn");
const inputBox = document.getElementById("inputbox");
const routineInput = document.getElementById("routineinput");
const confirmBtn = document.getElementById("confirmbtn");
const cancelBtn = document.getElementById("cancelbtn");
const routineList = document.getElementById("routinelist");

/* To show the input box on clicking the button */
routineBtn.onclick = function(){
    inputBox.classList.remove("hidden");
    routineInput.value = '';
    routineInput.focus();
};

/* To hide the input box when cancel is clicked */
cancelBtn.onclick = function(){
    inputBox.classList.add("hidden");
};

/* To add routine when confirm is clicked */
confirmBtn.onclick = function(){
    const text = routineInput.value.trim();

    // Fixed: removed the semicolon after the if condition
    if (text === '') {
        return;
    }

    /* To create the card and set the text */
    const routineCard = document.createElement("div");
    routineCard.className = "routine-box";
    routineCard.textContent = text;

    routineList.appendChild(routineCard);
    
    // Clear input and hide
    routineInput.value = '';
    inputBox.classList.add("hidden");
};
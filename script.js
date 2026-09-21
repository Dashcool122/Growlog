const taskBtn = document.getElementById("addtaskbtn");
const inputBox = document.getElementById("inputbox");
const taskInput = document.getElementById("taskinput");
const confirmBtn = document.getElementById("confirmbtn");
const cancelBtn = document.getElementById("cancelbtn");
const taskList = document.getElementById("tasklist");

/* To show the input box on clicking the button */
taskBtn.onclick = function(){
    inputBox.classList.remove("hidden");
    taskInput.value = '';
    taskInput.focus();
};

/* To hide the input box when cancel is clicked */
cancelBtn.onclick = function(){
    inputBox.classList.add("hidden");
};

/* To add routine when confirm is clicked */
confirmBtn.onclick = function(){
    const text = taskInput.value.trim();

    // Fixed: removed the semicolon after the if condition
    if (text === '') {
        return;
    }

    /* To create the card and set the text */
    const taskCard = document.createElement("div");
    taskCard.className = "task-box";

    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = text;

    const infoInput = document.createElement("input");
    infoInput.type = "text";
    infoInput.className = "task-info-field";
    infoInput.placeholder = "Additional Info.."

    const cardRight = document.createElement("div");
    cardRight.className = "card-right";

    const statusGroup = document.createElement("div");
    statusGroup.className = "status-group";

    const statusLabel = document.createElement("label");
    statusLabel.className = "status-label";
    statusLabel.textContent = "Status";

    const statusCheckbox = document.createElement("input");
    statusCheckbox.type = "checkbox";
    statusCheckbox.className = "status-checkbox";

    statusGroup.appendChild(statusLabel);
    statusGroup.appendChild(statusCheckbox);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "x";

    deleteBtn.onclick = function(){
        taskCard.remove();
    }

    cardRight.appendChild(statusGroup);
    cardRight.appendChild(deleteBtn);

    taskCard.appendChild(textSpan);
    taskCard.appendChild(infoInput);
    taskCard.appendChild(cardRight);

    taskList.appendChild(taskCard);
    
    // Clear input and hide
    taskInput.value = '';
    inputBox.classList.add("hidden");
};
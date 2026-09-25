const taskBtn = document.getElementById("addtaskbtn");
const inputBox = document.getElementById("inputbox");
const taskInput = document.getElementById("taskinput");
const confirmBtn = document.getElementById("confirmbtn");
const cancelBtn = document.getElementById("cancelbtn");
const taskList = document.getElementById("tasklist");
const completedList = document.getElementById("completedlist");
const completedSection = document.getElementById("completed-section");


function toggleCompletedHeader(){
    if (completedList.children.length > 0){
        completedSection.classList.remove("hidden");
    } else{
        completedSection.classList.add("hidden");
    }
}

/* to show input box on clicking button */
taskBtn.onclick = function(){
    inputBox.classList.remove("hidden");
    taskInput.value = '';
    taskInput.focus();
};

/* to hide the input box when cancel is clicked */
cancelBtn.onclick = function(){
    inputBox.classList.add("hidden");
};

/* to add routine when confirm is clicked */
confirmBtn.onclick = function(){
    const text = taskInput.value.trim();

    // Fixed: removed the semicolon after the if condition
    if (text === '') {
        return;
    }

    /* to create the card and set text */
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

    statusCheckbox.onchange = function(){
        if (statusCheckbox.checked){
            infoInput.disabled = true; //to lock the additional info field controls
            taskCard.classList.add("task-done");
            completedList.appendChild(taskcard);
        } else{
            infoInput.disabled = false; //to unlock the additional info field controls
            taskCard.classList.remove("task-done");
            taskList.appendChild(taskcard);
        }
        toggleCompletedHeader();
    };

    statusGroup.appendChild(statusLabel);
    statusGroup.appendChild(statusCheckbox);


    /*delete button code*/
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
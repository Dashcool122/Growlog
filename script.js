//sidebar elements:
const taskBtn = document.getElementById("addtaskbtn");
const inputBox = document.getElementById("inputbox");
const taskInput = document.getElementById("taskinput");
const confirmBtn = document.getElementById("confirmbtn");
const cancelBtn = document.getElementById("cancelbtn");
//task lists:
const taskList = document.getElementById("tasklist");
const completedList = document.getElementById("completedlist");
const completedSection = document.getElementById("completed-section");
//navigation tabs and views
const tasksTabBtn = document.getElementById("tasks-tab-btn");
const journalTabBtn = document.getElementById("journal-tab-btn");
const tasksView = document.getElementById("tasks-view");
const journalView = document.getElementById("journal-view");
const tasksSidebar = document.getElementById("tasks-sidebar");
const journalSidebar = document.getElementById("journal-sidebar");


function toggleCompletedHeader(){
    if (completedList.children.length > 0){
        completedSection.classList.remove("hidden");
    } else{
        completedSection.classList.add("hidden");
    }
}

//code to switch to Tasks view
tasksTabBtn.onclick = function(){
    //shows tasks workspace
    tasksView.classList.remove("hidden");
    tasksSidebar.classList.remove("hidden");
    //hides journal workspace
    journalView.classList.add("hidden");
    journalSidebar.classList.add("hidden");
    //switches the tab highlighting to the Tasks button
    tasksTabBtn.classList.add("active");
    journalTabBtn.classList.remove("active");
}

//code to switch to Journal view
journalTabBtn.onclick = function(){
    //show journal workspace
    journalView.classList.remove("hidden");
    journalSidebar.classList.remove("hidden");
    //hide tasks workspace
    tasksView.classList.add("hidden");
    tasksSidebar.classList.add("hidden")
    //switches the tab highlighting to the Journal button
    journalTabBtn.classList.add("active");
    tasksTabBtn.classList.remove("active");

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
            completedList.appendChild(taskCard);
        } else{
            infoInput.disabled = false; //to unlock the additional info field controls
            taskCard.classList.remove("task-done");
            taskList.appendChild(taskCard);
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
        toggleCompletedHeader();
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
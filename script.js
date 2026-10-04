// LocalStorage keys
const TASKS_STORAGE_KEY = "growlog_tasks";
const JOURNALS_STORAGE_KEY = "growlog_journals";
const ACTIVE_JOURNAL_KEY = "growlog_active_journal_id";

//sidebar elements:
const taskBtn = document.getElementById("addtaskbtn");
const inputBox = document.getElementById("inputbox");
const taskInput = document.getElementById("taskinput");
const confirmBtn = document.getElementById("confirmbtn");
const cancelBtn = document.getElementById("cancelbtn");
const newEntryBtn = document.getElementById("new-entry-btn");
const deleteEntryBtn = document.getElementById("delete-entry-btn");

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
const journalList = document.getElementById("journal-list");
const journalTitleInput = document.getElementById("journal-title");
const journalBody = document.getElementById("journal-body");
const emptyTasksState = document.getElementById("empty-tasks-state");
const progressBarFill = document.getElementById("progress-bar-fill");
const progressPercent = document.getElementById("progress-percent");
const progressCountText = document.getElementById("progress-count");

// Initialize Data from LocalStorage (or fall back to defaults)
let tasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)) || [];
let journals = JSON.parse(localStorage.getItem(JOURNALS_STORAGE_KEY)) || [];
let activeJournalId = JSON.parse(localStorage.getItem(ACTIVE_JOURNAL_KEY)) || null;

// Helpers to save to LocalStorage
function saveTasks() {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

function saveJournals() {
    localStorage.setItem(JOURNALS_STORAGE_KEY, JSON.stringify(journals));
    localStorage.setItem(ACTIVE_JOURNAL_KEY, JSON.stringify(activeJournalId));
}

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

function toggleEmptyTasksState(){
    if (tasks.length === 0){
        emptyTasksState.classList.remove("hidden");
    } else{
        emptyTasksState.classList.add("hidden");
    }
}

// Extracted reusable function to render a task card from memory or fresh input
function renderTaskCard(task) {
    /* to create the card and set text */
    const taskCard = document.createElement("div");
    taskCard.className = `task-box ${task.completed ? "task-done" : ""}`;

    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = task.text;

    const infoInput = document.createElement("input");
    infoInput.type = "text";
    infoInput.className = "task-info-field";
    infoInput.placeholder = "Additional Info..";
    infoInput.value = task.info || "";
    infoInput.disabled = task.completed;

    // Save info text edits to LocalStorage
    infoInput.addEventListener("input", () => {
        task.info = infoInput.value;
        saveTasks();
    });

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
    statusCheckbox.checked = task.completed;

    statusCheckbox.onchange = function(){
        task.completed = statusCheckbox.checked;
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
        saveTasks(); // Persist completed status update
        updateTaskProgress();
    };

    statusGroup.appendChild(statusLabel);
    statusGroup.appendChild(statusCheckbox);

    /*delete button code*/
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "x";

    deleteBtn.onclick = function(){
        tasks = tasks.filter(t => t.id !== task.id); // Remove from state array
        taskCard.remove();
        toggleCompletedHeader();
        toggleEmptyTasksState();
        updateTaskProgress();
        saveTasks(); // Persist removal
    }

    cardRight.appendChild(statusGroup);
    cardRight.appendChild(deleteBtn);

    taskCard.appendChild(textSpan);
    taskCard.appendChild(infoInput);
    taskCard.appendChild(cardRight);

    // Append to correct container based on saved status
    if (task.completed) {
        completedList.appendChild(taskCard);
    } else {
        taskList.appendChild(taskCard);
    }
}

// Render all tasks from memory
function loadTasks() {
    taskList.innerHTML = "";
    completedList.innerHTML = "";
    tasks.forEach(task => renderTaskCard(task));
    toggleCompletedHeader();
    toggleEmptyTasksState();
    updateTaskProgress();
}

/* to add task when confirm is clicked */
confirmBtn.onclick = function(){
    const text = taskInput.value.trim();

    // Fixed: removed the semicolon after the if condition
    if (text === '') {
        return;
    }

    // Create persistent task object
    const newTask = {
        id: Date.now(),
        text: text,
        info: "",
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTaskCard(newTask);
    toggleCompletedHeader();
    toggleEmptyTasksState();
    updateTaskProgress();
    
    // Clear input and hide
    taskInput.value = '';
    inputBox.classList.add("hidden");
};

//logic for rich toolbar functions
document.querySelectorAll(".toolbar-btn").forEach(button => {
    button.addEventListener("click", function(e){
        e.preventDefault();
        const command = this.dataset.cmd;
        document.execCommand(command, false, null)
    });
});

function createNewJournal(){
    const newEntry = {
        id: Date.now(),
        title: "Untitled Entry",
        content: "",
    };
    journals.unshift(newEntry);
    activeJournalId = newEntry.id;
    saveJournals(); // Persist new entry
    renderJournalList();
    loadActiveJournal();
}

//render the sidebar pills
function renderJournalList(){
    journalList.innerHTML = "";
    journals.forEach(entry => {
        const item = document.createElement("div");
        item.className = `journal-entry-item ${entry.id === activeJournalId ? "active" : ""}`;
        item.textContent = entry.title || "Untitled Entry";
        item.onclick = () => {
            activeJournalId = entry.id;
            saveJournals(); // Persist active entry selection
            renderJournalList();
            loadActiveJournal();
        };
        journalList.appendChild(item);
    });
}

//load active entry into the editor fields
function loadActiveJournal(){
    const entry = journals.find(j => j.id === activeJournalId);
    if (!entry){
        journalTitleInput.value = "";
        journalBody.innerHTML = "";
        return;
    }
    journalTitleInput.value = entry.title === "Untitled Entry" ? "" : entry.title;
    journalBody.innerHTML = entry.content;
}

journalTitleInput.addEventListener("input", () => {
    const entry = journals.find(j => j.id === activeJournalId);
    if(entry){
        entry.title = journalTitleInput.value.trim() || "Untitled Entry";
        saveJournals(); // Persist title changes
        renderJournalList();
    }
});

journalBody.addEventListener("input", () => {
    const entry = journals.find(j => j.id === activeJournalId);
    if (entry){
        entry.content = journalBody.innerHTML;
        saveJournals(); // Persist body edits
    }
});

// delete active journal
deleteEntryBtn.addEventListener("click", () => {
    if (!activeJournalId) return;
    
    journals = journals.filter(j => j.id !== activeJournalId);
    activeJournalId = journals.length > 0 ? journals[0].id : null;
    saveJournals(); // Persist deletion
    renderJournalList();
    loadActiveJournal();
});

// button binding
newEntryBtn.addEventListener("click", createNewJournal);

function updateTaskProgress() {
    if(!progressBarFill || !progressPercent || !progressCountText) return;

    if (tasks.length === 0) {
        progressBarFill.style.width = "0%";
        progressPercent.textContent = "0%";
        return;
    }
    const completedCount = tasks.filter(t => t.completed).length;
    const totalCount = tasks.length;
    const percentage = Math.round((completedCount / tasks.length) * 100);

    progressBarFill.style.width = `${percentage}%`;
    progressPercent.textContent = `${percentage}%`;

    const taskWord = completedCount === 1 ? "task" : "tasks";
    progressCountText.textContent = `${completedCount} of ${totalCount} ${taskWord} completed`;
}

// App initialization on load
loadTasks();

if (journals.length === 0) {
    createNewJournal();
} else {
    // If active ID is missing or doesn't match an existing entry, fallback to first entry
    if (!activeJournalId || !journals.some(j => j.id === activeJournalId)) {
        activeJournalId = journals[0].id;
        saveJournals();
    }
    renderJournalList();
    loadActiveJournal();
}
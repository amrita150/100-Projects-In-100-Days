// Selecting elements
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim(); // Get input value
    if (taskText === "") return; // Prevent empty tasks

    // Create new list item
    const li = document.createElement("li");
    li.innerText = taskText;

    // Create remove button
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.classList.add("btn-remove");
    
    // Event listener for remove button
    removeBtn.addEventListener("click", function () {
        taskList.removeChild(li);
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    taskInput.value = ""; // Clear input field
}

// Event listener for add task button
addTaskBtn.addEventListener("click", addTask);

// Event listener for pressing Enter key
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

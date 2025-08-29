// Add a new task
async function addTask(title) {
    try {
        const response = await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title })
        });

        if (response.status === 201) {
            const newTask = await response.json();
            alert(`✅ Task created: ${newTask.title}`);
            getAllTasks(); // refresh task list
        } else if (response.status === 400) {
            const error = await response.json();
            alert(`⚠️ Error: ${error.message}`);
        } else {
            alert(`Unexpected error: ${response.status}`);
        }
    } catch (err) {
        alert("🚨 Server unreachable!");
    }
}

function submitTask() {
    const title = document.getElementById("taskInput").value;
    if (title.trim() === "") {
        alert("⚠️ Please enter a task title");
        return;
    }
    addTask(title);
    document.getElementById("taskInput").value = ""; // clear input
}

// Fetch all tasks
async function getAllTasks() {
    try {
        const response = await fetch("http://localhost:5000/tasks");
        const tasks = await response.json();
        const container = document.getElementById("allTasks");
        container.innerHTML = "<h3>All Tasks:</h3><ul>" +
            tasks.map(t => `<li>${t.id}: ${t.title}</li>`).join("") +
            "</ul>";
    } catch (err) {
        alert("🚨 Could not fetch tasks");
    }
}

// Fetch task by ID
async function getTaskById() {
    const id = document.getElementById("taskIdInput").value;
    if (!id) {
        alert("⚠️ Please enter a task ID");
        return;
    }
    try {
        const response = await fetch(`http://localhost:5000/tasks/${id}`);
        if (response.status === 200) {
            const task = await response.json();
            document.getElementById("taskById").innerHTML =
                `<h3>Task Found:</h3><p>ID: ${task.id}, Title: ${task.title}</p>`;
        } else if (response.status === 404) {
            document.getElementById("taskById").innerHTML =
                `<p style="color:red;">❌ Task not found</p>`;
        }
    } catch (err) {
        alert("🚨 Could not fetch task by ID");
    }
}

// Update a task
async function updateTask() {
    const id = document.getElementById("updateId").value;
    const newTitle = document.getElementById("updateTitle").value;
    if (!id || newTitle.trim() === "") {
        alert("⚠️ Please enter task ID and new title");
        return;
    }
    try {
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle })
        });
        if (response.status === 200) {
            const updated = await response.json();
            document.getElementById("updateResult").innerHTML =
                `<p style="color:green;">✅ Updated Task: ${updated.id} - ${updated.title}</p>`;
            getAllTasks();
        } else if (response.status === 404) {
            document.getElementById("updateResult").innerHTML =
                `<p style="color:red;">❌ Task not found</p>`;
        }
    } catch (err) {
        alert("🚨 Could not update task");
    }
}

// Delete a task
async function deleteTask() {
    const id = document.getElementById("deleteId").value;
    if (!id) {
        alert("⚠️ Please enter a task ID");
        return;
    }
    try {
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE"
        });
        if (response.status === 200) {
            const deleted = await response.json();
            document.getElementById("deleteResult").innerHTML =
                `<p style="color:green;">🗑️ Deleted Task: ${deleted.id} - ${deleted.title}</p>`;
            getAllTasks();
        } else if (response.status === 404) {
            document.getElementById("deleteResult").innerHTML =
                `<p style="color:red;">❌ Task not found</p>`;
        }
    } catch (err) {
        alert("🚨 Could not delete task");
    }
}

// Load all tasks on page load
window.onload = getAllTasks;

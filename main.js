
function handleNewTask(){
    const taskInput = document.querySelector('#todo input');
    if(taskInput.value.length==0 || taskInput.value===null){
        alert("Please type your task ⚠")
    }
    else{
        addTask(taskInput.value);
        storeTask(taskInput.value);
        taskInput.value = "";
    }
}

/**
 * 
 * @param {string} newTask 
 * back tick ` is template string
 * chrome shortcut for query selector $
 * ${} inside ` ` lets you put js inside html
 */
function addTask(newTask){
    document.querySelector('#todolist').innerHTML +=`
    <div class="task">
    <p>${newTask}</p>
    <button onclick="this.parentElement.remove();removeTask('${newTask}');" class="delete">
    Delete
    </button>
    <button onclick="this.parentElement.style.textDecoration='line-through'" class="strike">
    Done
    </button>
    </div>
    `;
}

function storeTask(taskInput){
    if(taskInput!==null){
        localStorage.setItem("task",JSON.stringify([taskInput].concat(getTask())));
        console.log(localStorage);
    }
}
/**
 * get task returns list of task titles
 * @returns {string[]}
 */
function getTask(){
    const taskFromStorage = localStorage.getItem("task");
    if(typeof taskFromStorage === "string"){
        return JSON.parse(taskFromStorage);
    } else {
        return [];
    }
}
/**
 * 
 * @param {string} itemToDelete 
 */
function removeTask(itemToDelete){
    const currentTasks = getTask();
    const updatedTasks = currentTasks.filter(item => item !== itemToDelete);
    localStorage.setItem('task',JSON.stringify(updatedTasks));
}

document.querySelector('#push').onclick = handleNewTask;

// add tasks from local storage to dom after the page refreshes
getTask().forEach(addTask);





//todo: features: change css, move to react and then maybe undone click,
// and store it to a server- JSON BIN
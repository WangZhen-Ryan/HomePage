const input = document.querySelector(".input"), // todo input
        addBtn = document.querySelector(".btn"), // todo btn
        list = document.querySelector(".list"); // todo list
        filter = document.querySelector(".filtertodo"); // filter todo

// event listeners note that DOMContentLoaded is not working due to async of js
window.addEventListener("load", getTodos); // if the page is loaded, get the todos from cache
// document.addEventListener("DOMContentLoaded", getTodos);

// add todo
addBtn.addEventListener("click", addTodo);
// delete todo
list.addEventListener("click", deleteItem);
// filter todo
filter.addEventListener("click", filterItem);




//define some functions
function addTodo(event) {
    //console.log("hello");

    // prevent form from submitting
    event.preventDefault();

    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = input.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //add todo to local storage
    saveLocal(input.value);

    // check mark btn
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    completeBtn.classList.add("complete-btn");
    todoDiv.appendChild(completeBtn);

    // trash btn
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fa-solid fa-eraser"></i>';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    // append to list
    list.appendChild(todoDiv);

    // clear todo input value
    input.value = "";
}


function deleteItem(event) {
    // prevent form from submitting
    event.preventDefault();

    // get what is clicked
    const item = event.target;

    // delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //todo.remove();
        // animation of remove
        todo.classList.add("delete-animation");
        todo.addEventListener("transitionend", function () {
            todo.remove();
            removeLocal(todo); // remove the todo from local storage
        });
    }

    // save all the completed
    if (item.classList[0] === "complete-btn") {
        const alltodos = item.parentElement;
        alltodos.classList.toggle("completed");
    }
}

function filterItem(event) {
    // get all todo items
    const alltodos = list.childNodes;
    // for each of to do item, we want to filter them
    alltodos.forEach(function(alltodo){
        switch(event.target.value){
            case "all":
                alltodo.style.display = "flex";
                break;
            case "completed":
                // already completed
                if(alltodo.classList.contains("completed")){
                    alltodo.style.display = "flex"; // display it
                }else{
                    alltodo.style.display = "none"; // hide it
                }break;
            case "uncompleted":
                // not completed
                if(!alltodo.classList.contains("completed")){
                    alltodo.style.display = "flex"; // display it
                }else{  
                    alltodo.style.display = "none"; // hide it
                }break;}
            });
}

//local storage
function saveLocal(alltodo){
    // check if there is anything in the local storage
    let alltodos;
    if(localStorage.getItem("alltodos") === null){
        alltodos = []; // todo array
    }else{
        alltodos = JSON.parse(localStorage.getItem("alltodos")); // get the todos
    }
    alltodos.push(alltodo); // push the todo into the array
    localStorage.setItem("alltodos", JSON.stringify(alltodos)); // set the todos
}


function getTodos(){
    // check if there is anything in the local storage
    let alltodos;
    if(localStorage.getItem("alltodos") === null){
        alltodos = []; // todo array
    }else{
        alltodos = JSON.parse(localStorage.getItem("alltodos")); // get the todos
    }
    alltodos.forEach(function(alltodo){
        // todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // create li
        const newTodo = document.createElement("li");
        newTodo.innerText = alltodo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // check mark btn
        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        completeBtn.classList.add("complete-btn");
        todoDiv.appendChild(completeBtn);

        // trash btn
        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add("trash-btn");
        todoDiv.appendChild(trashBtn);

        // append to list
        list.appendChild(todoDiv);
    });
}


//sycn the remove action in local storage
function removeLocal(alltodo){
    // check if there is anything in the local storage
    let alltodos;
    if(localStorage.getItem("alltodos") === null){
        alltodos = []; // todo array
    }else{
        alltodos = JSON.parse(localStorage.getItem("alltodos")); // get the todos
    }

    // get the index of the todo
    const todoIndex = alltodo.children[0].innerText; // get the name first
    alltodos.splice(alltodos.indexOf(todoIndex), 1); // remove the todo
    localStorage.setItem("alltodos", JSON.stringify(alltodos)); // set the todos

}
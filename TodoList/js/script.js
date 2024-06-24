//  DOM

const todoForm = document.querySelector("#form-todo");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector(".todo-list");
const editForm = document.querySelector("#form-edit");
const editInput = document.querySelector("#edit-input");
const cancelButton = document.querySelector("#cancel-edit-button");

const searchInput = document.querySelector("#search-input");
const eraseButton = document.querySelector("#erase-button");
const filterSelect = document.querySelector("#filter-select");

let oldTitleValue;

// FUNCTIONS

const createNewTodo = (newTodo, done = 0, save = 1) => {
    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = newTodo
    todo.appendChild(todoTitle)

    const doneButton = document.createElement("button")
    const editButton = document.createElement("button")
    const removeButton = document.createElement("button")

    doneButton.classList.add("finish-todo")
    editButton.classList.add("edit-todo")
    removeButton.classList.add("remove-todo")

    doneButton.innerHTML = `<i class="fa-solid fa-check"></i>`
    editButton.innerHTML = `<i class="fa-solid fa-pen"></i>`
    removeButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`

    todo.appendChild(doneButton)
    todo.appendChild(editButton)
    todo.appendChild(removeButton)

    // Local Storage

    if(done){
        todo.classList.add("done")
    }

    if(save) {
        saveTodoLocalStorage({newTodo, done})
    }

    todoList.appendChild(todo)

    todoInput.value = ""
    todoInput.focus()
}

const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

const updateTodo = (newEditTodo) => {
    const allTodo = document.querySelectorAll(".todo")

    allTodo.forEach((todo) => {
        let todoTitleNow = todo.querySelector("h3")

        if(todoTitleNow.innerText === oldTitleValue) {
            todoTitleNow.innerText = newEditTodo

            updateTodoLocalStorage(oldTitleValue, newEditTodo)
        }
    })
}

const getSearchTodos = (search) => {

    const allTodo = document.querySelectorAll(".todo")

    allTodo.forEach((todo) => {
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        const searchLowerCase = search.toLowerCase()

        todo.style.display = "flex"

        if(!todoTitle.includes(searchLowerCase)) {
            todo.style.display = "none"
        }
    })
}

const filterTodos = (value) => {
    const allTodo = document.querySelectorAll(".todo")

    switch(value) {
        case "all":
            allTodo.forEach((todo) => (todo.style.display = "flex"))
            break

        case "done":
            allTodo.forEach((todo) => (todo.classList.contains("done") ? todo.style.display = "flex" : todo.style.display = "none"))
            break
        
        case "todo":
            allTodo.forEach((todo) => (todo.classList.contains("done") ? todo.style.display = "none" : todo.style.display = "flex"))
            break
        
        default:
            break    
    }
}

// EVENTS

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newTodo = todoInput.value;

    console.log(newTodo);

    if (newTodo){
        createNewTodo(newTodo);
    }
})

document.addEventListener("click", (e) => {
    const targetButton = e.target
    const divTodo = targetButton.closest("div")
    let todoTitle;

    if (divTodo && divTodo.querySelector("h3")){
        todoTitle = divTodo.querySelector("h3").innerText
    }

    if(targetButton.classList.contains("finish-todo")) {
        divTodo.classList.toggle("done")

        updateTodoStatusLocalStorage(todoTitle)
    }

    if(targetButton.classList.contains("remove-todo")) {
        divTodo.remove();

        removeTodoLocalStorage(todoTitle)
    }

    if(targetButton.classList.contains("edit-todo")) {
        toggleForms()

        editInput.value = todoTitle
        oldTitleValue = todoTitle
    }
})

cancelButton.addEventListener("click", (e) => {
    e.preventDefault()
    toggleForms();
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const newEditInput = editInput.value;
    
    if(newEditInput) {
        updateTodo(newEditInput)
    }

    toggleForms()
})

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value
    
    getSearchTodos(search)
})

eraseButton.addEventListener("click", (e) => {
    e.preventDefault()
    searchInput.value = ""

    searchInput.dispatchEvent(new Event("keyup"))
})

filterSelect.addEventListener("change", (e) => {
    const filterValue = e.target.value

    filterTodos(filterValue)
})

// Local Storage 

const getTodosLocalStorage = () => {
    const todosAll = JSON.parse(localStorage.getItem("todos")) || []
    return todosAll   
}    

const loadTodos = () => {
    const allTodos = getTodosLocalStorage();

    allTodos.forEach((todo) => {
        createNewTodo(todo.newTodo, todo.done, 0)
    })
}

const saveTodoLocalStorage = (todo) => {
    const allTodos = getTodosLocalStorage();

    allTodos.push(todo)

    localStorage.setItem("todos", JSON.stringify(allTodos))
}

const removeTodoLocalStorage = (todoTitle) => {
    const allTodos = getTodosLocalStorage();

    const filteredTodos = allTodos.filter((todo) => todo.newTodo !== todoTitle)

    localStorage.setItem("todos", JSON.stringify(filteredTodos))
}

const updateTodoStatusLocalStorage = (todoTitle) => {
    const allTodos = getTodosLocalStorage();

    allTodos.map((todo) => todo.newTodo === todoTitle ? todo.done = !todo.done : null)

    localStorage.setItem("todos", JSON.stringify(allTodos))
}

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const allTodos = getTodosLocalStorage();

    allTodos.map((todo) => todo.newTodo === todoOldText ? todo.newTodo = todoNewText : null)

    localStorage.setItem("todos", JSON.stringify(allTodos))
}

loadTodos()
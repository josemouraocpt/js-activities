const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");
const todos = document.getElementById("todos");

const allTodos = JSON.parse(localStorage.getItem("todos"));

if(allTodos){
    allTodos.forEach((e) => {
        addTodo(e);
    });
};

formEl.addEventListener('submit', (e) =>{
    e.preventDefault();
    addTodo();
});

function addTodo(todo){
    let todoText = inputEl.value;

    if(todo){
        todoText = todo.text;
    }

    if(todoText){
        const todosEl = document.createElement('li');
        if(todo && todo.completed){
            todosEl.classList.add("completed");
        }
       
        todosEl.innerHTML = todoText;

        todosEl.addEventListener("click", () => {
            todosEl.classList.toggle("completed");
            updateLS();
        });

        todosEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            todosEl.remove();
            updateLS();
        });

        todos.appendChild(todosEl);

        inputEl.value = '';

        updateLS();
    };
    
};

function updateLS(){
    const todosEl = document.querySelectorAll("li");
    
    const todos = [];

    todosEl.forEach((todoEl) =>{
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
};
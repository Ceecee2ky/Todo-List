const todoForm = document.querySelector('form')
const inputBox = document.getElementById('todoInput')
const todoList = document.getElementById('todoList')

let allTodos = JSON.parse(localStorage.getItem('todos')) || [];
updateTodoList()
todoForm.addEventListener('submit', function(e){
    e.preventDefault()
   addTodo()
})

function addTodo(){
    const todoText = inputBox.value.trim()
    if(todoText.length > 0){
        allTodos.push(todoText);
        updateTodoList()
        inputBox.value = ''
    }
}
function updateTodoList(){
     todoList.innerHTML = ''
     allTodos.forEach((todo, todoIndex) =>{
       const todoItem = createTodoItem(todo, todoIndex)
        todoList.appendChild(todoItem)
     })
         saveTodo()
    
}
function createTodoItem(todo, todoIndex){
    const todoTR = document.createElement('tr');
  todoTR.classList.add('todo-item');
    todoTR.innerHTML = `
    
    <td>${todo}</td>
        <td><button class="pending">Pending</button></td>
        <td class='delete-btn'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></td>
    
        `
    const pendingBtn = todoTR.querySelector('.pending')
     pendingBtn.addEventListener('click', () => {
    pendingBtn.style.color = 'red';
    pendingBtn.innerText = 'Completed';
  });

  const deleteBtn = todoTR.querySelector('.delete-btn svg');
  deleteBtn.addEventListener('click', () => {
    allTodos.splice(todoIndex, 1);
    updateTodoList();
  });

    return todoTR
}
function saveTodo(){
   localStorage.setItem('todos', JSON.stringify(allTodos))
}









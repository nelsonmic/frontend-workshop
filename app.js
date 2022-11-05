// getting DOM elements
const enterTodo = document.querySelector("#enter-todo")
const submitTodoButton = document.querySelector("#submit-button")
const todoList = document.querySelector(".todo-list");
const todoCount = document.querySelector("#todo-count")
const clearAllbutton = document.querySelector("#clear-all")
const deleteTodoButtonUi = '<svg id="delete-button" width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="#d72323" fill-rule="evenodd" clip-rule="evenodd"></path></svg>'

// storage
let allTodosArray = [];
let allTodos = JSON.parse(localStorage.getItem("allTodos"));


window.addEventListener("load", ()=>{
      getAllTodos();
      handleTodoCount();
})

// this function handles creating a new todo item UI
const createTodoUi = (content) => {
      //creating todo elements and attaching attributes
      const todoListItem = document.createElement("div")
      todoListItem.setAttribute("class", "todo-list-item")
      const span = document.createElement("span")
      const span2 = document.createElement("span")
      const checkBox = document.createElement("input")
      checkBox.setAttribute("type", "checkbox")
      const p = document.createElement("p")
      p.innerHTML = content;
      span2.innerHTML = deleteTodoButtonUi;

      span.appendChild(checkBox)
      span.appendChild(p)
      todoListItem.appendChild(span)
      todoListItem.appendChild(span2)

      checkBox.addEventListener("click", ()=>{
            if (p.style.textDecoration === "line-through"){
                  p.style.textDecoration = "none"
                  p.style.color = "#ffffff"
            }else{
                  p.style.textDecoration = "line-through"
                  p.style.color = "#010101"
            }
          
      })

      span2.addEventListener("click", ()=>{
            todoList.innerHTML = "";
            deleteTodo(content);
      })

      return todoListItem;

}

const handleTodoCount = ()=>{
      if (allTodos === null) {
            todoCount.innerHTML = "0 items"
      } else {
            todoCount.innerHTML = `${allTodos.length} items left`
      }
}

submitTodoButton.addEventListener("click", ()=>{
      todoList.innerHTML = ""
      createTodo(enterTodo.value);
      enterTodo.value = "";
      getAllTodos();
      handleTodoCount();
})

const getAllTodos = () => {
      const gottenAllTodos = JSON.parse(localStorage.getItem("allTodos"))
      
      gottenAllTodos.forEach(item => {
            todoList.appendChild(createTodoUi(item));
      });
}

const createTodo = ( content ) => {
      if(allTodos === null) {
            allTodosArray = []
      }else{
            allTodosArray = allTodos;
      }
      allTodosArray.push(content)
      localStorage.setItem('allTodos', JSON.stringify(allTodosArray))
}

const deleteTodo = (content) => {
      if (allTodos !== null) {
            allTodosArray = allTodos;

            allTodosArray.splice(allTodos.indexOf(content), 1);
            localStorage.setItem('allTodos', JSON.stringify(allTodosArray))
            handleTodoCount()
            getAllTodos()
      } 

}
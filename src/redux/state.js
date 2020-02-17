import { createStore } from "redux";

const initialState = {
  // wrapper

  todos: [
    {
      title: "first",
      deadline: `2020-02-01`,
      isCompleted: false,
      createdOn: `2020-01-03`
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi dolorem quas accusantium, laborum soluta maiores quam et corrupti aliquam assumenda obcaecati sunt deleniti tenetur illo nesciunt praesentium in ea officiis?",
      deadline: `2020-02-01`,
      isCompleted: false,
      createdOn: `2020-01-03`
    },
    {
      title: "third",
      deadline: `2020-02-01`,
      isCompleted: false,
      createdOn: `2020-01-03`
    }
  ],
  editIndex: -1,

  // Input

  title: "",
  deadline: new Date().toISOString().split("T")[0],
  isCompleted: false,
  isValid: "a",
  showInput: false,
  createdOn: new Date().toISOString().split("T")[0],

  //   list

  todoStatus: "all",
  animateSlide: false,
  animateFade: false,
  deleteIndex: ""
};

function reducer(state = initialState, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));
  console.log("reducer", stateCopy);
  const todo = {
    title: state.title,
    deadline: state.deadline,
    isCompleted: state.isCompleted,
    createdOn: state.createdOn
  };

  switch (action.type) {
    case "add_todo":
      return addTodo(stateCopy, todo);

    case "set_state":
      return setState(stateCopy, action.payload);

    case "set_todo_data":
      return setToDoData(stateCopy, state, action.payload);

    case "delete_todo":
      return deleteTodo(stateCopy, state, action.payload);

    case "toggle_isCompleted":
      return toggleIsCompleted(stateCopy, state, action.payload);
    case "cancel_edit":
      return cancelEdit(stateCopy);
    default:
      return stateCopy;
  }
}

export default createStore(reducer);

let addTodo = (stateCopy, todo) => {
  if (stateCopy.editIndex >= 0) {
    stateCopy.todos[stateCopy.editIndex] = todo;
    stateCopy.title = "";
    stateCopy.deadline = new Date().toISOString().split("T")[0];
    stateCopy.isCompleted = false;
    stateCopy.isValid = "a";
    stateCopy.createdOn = new Date().toISOString().split("T")[0];
    stateCopy.animateSlide = true;
    stateCopy.editIndex=-1
    return stateCopy;
  }
  stateCopy.todos = [todo, ...stateCopy.todos];
  stateCopy.title = "";
  stateCopy.deadline = new Date().toISOString().split("T")[0];
  stateCopy.isCompleted = false;
  stateCopy.isValid = "a";
  stateCopy.createdOn = new Date().toISOString().split("T")[0];
  stateCopy.animateSlide = true;

  return stateCopy;
};

let setState = (stateCopy, payload) => {
  for (let key in payload) {
    stateCopy[key] = payload[key];
  }

  return stateCopy;
};
let setToDoData = (stateCopy, state, todo) => {
  stateCopy.editIndex = state.todos.indexOf(todo);
  stateCopy.title = stateCopy.todos[stateCopy.editIndex].title;
  stateCopy.deadline = stateCopy.todos[stateCopy.editIndex].deadline;
  stateCopy.isCompleted = stateCopy.todos[stateCopy.editIndex].isCompleted;
  stateCopy.showInput = true;
  return stateCopy;
};

let deleteTodo = (stateCopy, state, todo) => {
  let deleteIndex = state.todos.indexOf(todo);
  stateCopy.todos = stateCopy.todos.filter((todo, i) => i !== deleteIndex);
  stateCopy.deleteIndex = "";
  stateCopy.animateFade = false;
  return stateCopy;
};

let toggleIsCompleted = (stateCopy, state, todo) => {
  let index = state.todos.indexOf(todo);
  stateCopy.todos[index].isCompleted = !stateCopy.todos[index].isCompleted;
  return stateCopy;
};
let cancelEdit = stateCopy => {
  stateCopy.title = "";
  stateCopy.deadline = new Date().toISOString().split("T")[0];
  stateCopy.isCompleted = false;
  stateCopy.isValid = "a";
  stateCopy.createdOn = new Date().toISOString().split("T")[0];
  stateCopy.editIndex=-1

  return stateCopy;
};

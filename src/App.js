import React from "react";
import Navbar from "./Navbar";
import Input from "./Input";
import List from "./List";
import "./App.css";
import { connect } from "react-redux"

class App extends React.Component {


  toggleIsCompleted(todo) {
    var todos = this.props.todos.slice();
    todos[todos.indexOf(todo)].isCompleted = !todos[todos.indexOf(todo)]
      .isCompleted;

    this.props.dispatch({
      type: "set_state", payload: {
        todos: todos
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className=" p-5 m-5">
          <div className="row">
            <div className="col-md-5">
              <Input />
            </div>
            <div className="col-md-6  offset-md-1">
              <List />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


let mapStateToProps = state => {
  return state
}
export default connect(mapStateToProps)(App);


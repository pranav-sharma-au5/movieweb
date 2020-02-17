import React from "react";
import { connect } from "react-redux";

class List extends React.Component {
  setEditTodoData(todo) {
    this.props.dispatch({
      type: "set_todo_data",
      payload: todo
    });
  }

  handleSelectOnChange(event) {
    this.props.dispatch({
      type: "set_state",
      payload: {
        todoStatus: event.target.value
      }
    });
  }

  dateFormat(date) {
    var months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
    var b = date.split(/\D/);
    return b[2] + " " + months[b[1] - 1] + "'" + b[0].slice(2, 4);
  }

  handleDelete(todo) {
    this.props.dispatch({
      type: "set_state",
      payload: {
        animateFade: true,
        deleteIndex: this.props.todos.indexOf(todo)
      }
    });
  }

  handleAnimationEnd(animationName, todo) {
    //on animation end set animateSlide to false
    if (animationName === "animateleft") {
      this.props.dispatch({
        type: "set_state",
        payload: {
          animateSlide: false
        }
      });
    }
    //on fadeout animation end delete list item
    else if (animationName === "fade-in") {
      this.props.dispatch({ type: "delete_todo", payload: todo });
    }
  }

  render() {
    var todos = this.props.todos.filter(todo => {
      return this.props.todoStatus === "all"
        ? true
        : this.props.todoStatus === todo.isCompleted + ""
        ? true
        : false;
    });

    return (
      <div className=" rounded shadow pt-3 pl-3 pr-1 dark-transparent list-parent-div  bg-dark">
        <div className="row mr-3 mb-3">
          <h2 className="font-weight-lighter text-white d-inline col-lg-5  ">
            {" "}
            <i className="fa fa-list-ul" /> My To-do List
          </h2>
          <select
            className="offset-lg-4 mt-3 form-control  col-lg-3"
            onChange={event => this.handleSelectOnChange(event)}
            value={this.props.todoStatus}
            name="cars"
          >
            <option value="all">All</option>
            <option value={false}>Active</option>
            <option value={true}>Completed</option>
          </select>
        </div>
        <hr />
        <div className="scrollable">
          <ul className=" list-group">
            {todos.length ? (
              ""
            ) : (
              <h3 className="font-weight-lighter m-3 p-3 text-white text-center">
                {this.props.todoStatus === "all"
                  ? "Add tasks here"
                  : this.props.todoStatus === "false"
                  ? "No active tasks"
                  : "No completed tasks"}
              </h3>
            )}
            {todos.map((todo, index) => {
              return !todo.isCompleted ? (
                <li
                  onAnimationEnd={event =>
                    this.handleAnimationEnd(event.animationName, todo)
                  }
                  className={
                    " list-group-item mt-2 shadow rounded bg-danger text-white text-capitalize " +
                    (this.props.animateSlide && index === 0
                      ? "li-animate-left"
                      : "") +
                    (this.props.animateFade && this.props.deleteIndex === index
                      ? "delete-fade-out"
                      : "")
                  }
                  key={index}
                >
                  <span
                    className={
                      "fa-hide " + (this.props.deleteIndex ? "d-none" : "")
                    }
                  >
                    <div id="triangle-right"></div>
                    <i
                      className="fa actions    fa-trash "
                      onClick={() => this.handleDelete(todo)}
                    />
                    <i
                      className="fa actions  fa-pencil "
                      onClick={() => this.setEditTodoData(todo)}
                    />
                    <i
                      onClick={() =>
                        this.props.dispatch({
                          type: "toggle_isCompleted",
                          payload: todo
                        })
                      }
                      className="fa actions  fa-check"
                    />
                  </span>
                  <span className="todo-title">{todo.title}</span>

                  <span className="float-right deadline-span pb-2">
                    <span className="ml-3">
                      <i className="fa fa-calendar mr-3" />
                      <i>{this.dateFormat(todo.createdOn)}</i>
                    </span>
                    <img
                      className="ml-3 deadline-icon"
                      src="https://f1.pngfuel.com/png/770/221/316/alarm-icon-clock-icon-deadline-icon-general-icon-office-icon-time-icon-time-management-icon-wall-clock-emoticon-home-accessories-png-clip-art-thumbnail.png"
                      alt=""
                    />{" "}
                    {this.dateFormat(todo.deadline)}
                  </span>
                </li>
              ) : (
                <li
                  onAnimationEnd={event =>
                    this.handleAnimationEnd(event.animationName, todo)
                  }
                  className={
                    "list-group-item mt-2 shadow rounded bg-success  text-capitalize " +
                    (this.props.animateFade && this.props.deleteIndex === index
                      ? "delete-fade-out"
                      : "")
                  }
                  key={index}
                >
                  <span className="todo-title">
                    <del>{todo.title}</del>
                  </span>

                  <span className="float-right  pb-2">
                    <span className="ml-3">
                      <i className="fa fa-calendar mr-3" />
                      <i>{this.dateFormat(todo.createdOn)}</i>
                    </span>

                    <img
                      className="deadline-icon ml-3"
                      src="https://i.ibb.co/J38DHrj/deadline.png"
                      alt=""
                    />
                    <del> {this.dateFormat(todo.deadline)}</del>
                  </span>
                  <span className="fa-hide ">
                  <div id="triangle-right"></div>
                    <i
                      onClick={() =>
                        this.props.dispatch({
                          type: "toggle_isCompleted",
                          payload: todo
                        })
                      }
                      className="fa-undo  fa  actions   "
                    />

                    <i
                      className="fa  actions fa-trash     "
                      onClick={() => this.handleDelete(todo)}
                    />
                    <i
                      className="fa  actions fa-pencil   "
                      onClick={() => this.props.editToDo(todo)}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <hr className="bottom-hr" />
      </div>
    );
  }
}

let mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(List);

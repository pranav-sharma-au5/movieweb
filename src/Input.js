import React, { Component } from "react";
import { connect } from "react-redux";

class Input extends Component {
  handleInputChange(event) {
    this.props.dispatch({
      type: "set_state",
      payload: { title: event.target.value }
    });
  }
  handleDateChange(event) {
    this.props.dispatch({
      type: "set_state",
      payload: { deadline: event.target.value }
    });
  }

  sendTodotoWrapper() {
    console.log("send to wrapper data");
    this.props.dispatch({ type: "add_todo" });
  }

  handleEnterKeypress(e) {
    e.preventDefault();
    e.target.checkValidity()
      ? this.sendTodotoWrapper()
      : this.props.dispatch({ type: "set_state", payload: { isValid: false } });
  }
  handleCancel() {
    this.props.dispatch({ type: "cancel_edit" });
  }

  render() {
    return (
      <div className={"bg-dark dark-transparent rounded p-3 mb-3 shadow "}>
        <h1 className="font-weight-light ml-2 text-white">
          <i
            onClick={() =>
              this.props.dispatch({
                type: "set_state",
                payload: { showInput: !this.props.showInput }
              })
            }
            className={
              this.props.showInput ? "fa fa-minus-circle" : "fa fa-plus-circle"
            }
          ></i>{" "}
          To-do
        </h1>
        <form
          className={
            (this.props.isValid ? "" : "was-validated ") +
            (this.props.showInput ? "animate-top" : "d-none")
          }
          onSubmit={event => this.handleEnterKeypress(event)}
          noValidate
        >
          <input
            type="text"
            className="form-control  col-10 mx-3 mt-3"
            onChange={event => this.handleInputChange(event)}
            value={this.props.title}
            placeholder="Title"
            minLength={3}
            required
          />
          <div className="invalid-feedback text-white ml-4">
            Min 3 characters.{" "}
          </div>
          <input
            type="date"
            className="form-control  col-10 m-3"
            onChange={event => this.handleDateChange(event)}
            value={this.props.deadline}
            required
          />

          <button className="btn btn-primary m-3 ">
            {this.props.editIndex !== -1 ? "Edit" : "Add"}
          </button>
          {this.props.editIndex !== -1 && (
            <button
              type="button"
              onClick={() => this.handleCancel()}
              className="btn btn-outline-light m-3 "
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Input);

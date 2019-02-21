import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";

class App extends Component {
  constructor() {
    // Intial setup for app state
    super();
    this.state = {
      newDescription: "",
      newTitle: "",
      toDos: []
    };
  }

  // Retrieve data from API
  componentDidMount() {
    fetch("http://localhost:5000/api/v1/todos/", {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ toDos: data });
        console.log(data);
      });
  }

  // Update state values for adding new todos
  onChange = (key, value) => {
    this.setState({ [key]: value });
  };

  // Submits new todos to DB
  handleSubmit = event => {
    event.preventDefault();
    // Need to update to connect with DB and properly structure obj

    // let { toDos, newTitle } = this.state;
    // toDos.push(newTitle);
    // this.setState({
    //   toDos: newTitle,
    //   newTitle: ""
    // });
  };

  // Removes todos
  removeButton = event => {
    event.preventDefault();
    const { toDos } = this.state;
    let index = event.target.id;
    toDos.splice(index, 1);
    // Need to Update to connect with DB
    this.setState({ toDos });
  };

  // Clears all todos -> Do we still wand this with the API?
  clearButton = event => {
    event.preventDefault();
    let toDos = this.state;
    toDos = [];
    this.setState({ toDos });
  };

  // Renders the HTML for our app
  render() {
    // Maps out ToDo list items
    const todos = this.state.toDos.map((item, index) => {
      return (
        <li key={index}>
          <div className="titlename">
            <span className="actualtitle">Title: </span>
            {item.title}
          </div>

          <div className="description">
            <span className="actualdesc">Description: </span>
            {item.description}
          </div>
          <div className="rmButton">
            <button id={index} onClick={this.removeButton}>
              Remove
            </button>
          </div>
        </li>
      );
    });

    return (
      <div className="App">
        <h1 className="title">To do List</h1>

        <div className="inputContainer">
          {/* Form for submitting new todos */}
          <form className="toDoForm" onSubmit={this.handleSubmit}>
            <input
              className="title"
              value={this.state.newTitle}
              onChange={event => {
                this.onChange("newTitle", event.target.value);
              }}
              key="newTitle"
            />
            <input
              className="description"
              value={this.state.newDescription}
              onChange={event => {
                this.onChange("newDescription", event.target.value);
              }}
              key="newDescription"
            />
            <input className="submitButton" type="submit" value="Add to list" />
          </form>
        </div>

        {/* Conditionally renders clear button */}
        {this.state.toDos.length > 0 ? (
          <div className="clearB">
            <button onClick={this.clearButton}>Clear All</button>
          </div>
        ) : null}
        {/* Renders list of todos */}
        <ul className="bulletList">{todos}</ul>
      </div>
    );
  }
}

export default App;

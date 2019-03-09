import React, { Component } from "react";
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
    fetch("https://lucas-todo.herokuapp.com/api/v1/todos/", {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ toDos: data });
        //console.log(data);
      });
  }

  // Update state values for adding new todos
  onChange = (key, value) => {
    this.setState({ [key]: value });
  };

  // Submits new todos to DB
  handleSubmit = event => {
    event.preventDefault();
    let { toDos, newTitle, newDescription } = this.state;
    if (newTitle.length === 0 || newDescription.length === 0) {
      alert("Bad input");
      return;
    }
    fetch("https://lucas-todo.herokuapp.com/api/v1/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        completed: false
      })
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        toDos.push(data);

        this.setState({ toDos, newTitle: "", newDescription: "" });
      })
      .catch(error => {
        console.error(error);
      });
  };
  // let { toDos, newTitle } = this.state;
  // toDos.push(newTitle);
  // this.setState({
  //   toDos: newTitle,
  //   newTitle: ""
  // });

  // Removes todos
  removeButton = event => {
    event.preventDefault();
    const { toDos } = this.state;
    let index = event.target.id;
    let oldTodo = toDos.splice(index, 1)[0];

    fetch(`https://lucas-todo.herokuapp.com/api/v1/todos/${oldTodo._id}`, {
      method: "DELETE",
      headers: {}
    })
      //.then(response => console.log(response))
      .catch(error => {
        console.error(error);
      });

    // Need to Update to connect with DB
    this.setState({ toDos });
  };

  // Clears all todos -> Do we still wand this with the API?
  clearButton = event => {
    event.preventDefault();
    let toDos = this.state;
    toDos = [];
    fetch("https://lucas-todo.herokuapp.com/api/v1/todos", {
      method: "DELETE"
    })
      .then(response => console.log(response))
      .catch(error => {
        console.error(error);
      });
    this.setState({ toDos });
  };

  //complete button!
  completeButton = event => {
    event.preventDefault();
    const { toDos } = this.state;
    let index = event.target.id;
    let todo = toDos[index];
    todo.completed = !todo.completed;
    fetch(`https://lucas-todo.herokuapp.com/api/v1/todos/${todo._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: todo.completed
      })
    })
      //.then(result => console.log(result))
      .catch(e => console.log(e));
    toDos[index] = todo;
    this.setState({ toDos });
  };

  // Renders the HTML for the app
  render() {
    // Maps out ToDo list items
    const todos = this.state.toDos.map((item, index) => {
      return (
        <li key={index}>
          <div className="todoDetails">
            <div className="titlename">
              <span className="actualtitle">Title: </span>
              {item.title}
            </div>

            <div className="descriptionInput">
              <span className="actualdesc">Description: </span>
              {item.description}
            </div>
            <div className="finished">
              <span className="completeColor">completed: </span>
              {item.completed ? "True" : "False"}
            </div>
          </div>
          <div className="Buttons">
            <div className="complete">
              <button id={index} onClick={this.completeButton}>
                {item.completed ? "Mark as incomplete" : "Mark as complete"}
              </button>
            </div>
            <div className="rmButton">
              <button id={index} onClick={this.removeButton}>
                Remove
              </button>
            </div>
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
              className="titleInput"
              value={this.state.newTitle}
              onChange={event => {
                this.onChange("newTitle", event.target.value);
              }}
              key="newTitle"
              placeholder="Title"
            />
            <input
              className="description"
              value={this.state.newDescription}
              onChange={event => {
                this.onChange("newDescription", event.target.value);
              }}
              key="newDescription"
              placeholder="Description"
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

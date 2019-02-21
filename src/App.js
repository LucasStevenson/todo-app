import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";

class App extends Component {
  constructor() {
    //Not sure how this is any different from what you had
    super();
    this.state = {
      newDescription: "",
      newTitle: "",
      toDos: []
    };
  }

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

  onChange = (key, value) => {
    this.setState({ [key]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let { toDos, newTitle } = this.state;
    toDos.push(newTitle);
    this.setState({
      toDos: newTitle,
      newTitle: ""
    });
  };

  removeButton = event => {
    event.preventDefault();
    const { toDos } = this.state;
    let index = event.target.id;
    toDos.splice(index, 1);

    this.setState({ toDos });
  };

  clearButton = event => {
    event.preventDefault();
    let toDos = this.state;
    toDos = [];
    this.setState({ toDos });
  };

  render() {
    const toDoItem = this.state.toDos.map((item, index) => {
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

        {this.state.toDos.length > 0 ? (
          <div className="clearB">
            <button onClick={this.clearButton}>Clear All</button>
          </div>
        ) : null}

        <ul className="bulletList">{toDoItem}</ul>
      </div>
    );
  }
}

export default App;

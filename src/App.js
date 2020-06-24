import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoApp from "./components/TodoApp/TodoApp";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoApp />
      </div>
    );
  }
}

export default App;

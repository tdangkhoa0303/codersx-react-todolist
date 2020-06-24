import React, { Component } from "react";
import "./TodoApp.css";

export default class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
       
      ],
      isVisible: false,
      inputValue: ""
    };
    this.finishTodo = this.finishTodo.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  finishTodo(todo) {
    const { todos } = this.state;
    const index = todos.indexOf(todo);
    return e => {
      this.setState({
        todos: [
          ...todos.slice(0, index),
          { ...todo, isDone: true },
          ...todos.slice(index + 1)
        ]
      });
    };
  }

  onKeyUp(e) {
    let value = e.target.value;
    if (e.keyCode === 13) {
      if (!value) return;
      value = value.trim();
      if (!value) return;
      this.setState({
        todos: [...this.state.todos, { name: value, isDone: false }],
        inputValue: ""
      });
    } else {
      this.setState({ inputValue: value });
    }
  }

  onChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    const { todos, isVisible, inputValue } = this.state;
    return (
      <div className="todos-app">
        <header>
          <img
            src="https://cdn.glitch.com/e7667fdf-e093-4209-aedc-d6a40d202968%2Fopen-menu%201.svg?v=1591765617917"
            alt="nav icon"
          />
          <h2 className="logo">DAILIST</h2>
          <span></span>
        </header>
        {isVisible && (
          <input
            type="text"
            className="todo-item"
            placeholder="Enter new todo..."
            value={inputValue}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
          />
        )}
        {todos.length <= 0 ? (
          <div className="no-todos">
            <div className="content">
              <div>Seems like...</div>
              <div>You have no list</div>
            </div>
            <img
              src="https://cdn.glitch.com/e7667fdf-e093-4209-aedc-d6a40d202968%2F338235-PA5XX2-593.svg?v=1591765613567"
              alt="no todos"
            />
          </div>
        ) : (
          <div className="list">
            <div className="upcomming">
              <h5 className="todo-type">UPCOMMING</h5>
              {todos
                .filter(e => !e.isDone)
                .map((todo, i) => (
                  <div
                    className="todo-item"
                    key={i}
                    onClick={this.finishTodo(todo)}
                  >{`${i + 1}. ${todo.name}`}</div>
                ))}
            </div>
            <div className="finished">
              <h5 className="todo-type">FINISHED</h5>
              {todos
                .filter(e => e.isDone)
                .map((e, i) => (
                  <div className="todo-item" key={i}>{`${i + 1}. ${
                    e.name
                  }`}</div>
                ))}
            </div>
          </div>
        )}
        <button
          id="btn-add-todo"
          onClick={() => this.setState({ isVisible: !this.state.isVisible })}
        >
          +
        </button>
      </div>
    );
  }
}

// Requirements:
// Viết một app todo-list có giao diện như hình https://cdn.glitch.com/780fd861-6c5c-464f-8b1b-c3c0ed64e30a%2FPasted_Image_4_20_20__9_05_PM.png?v=1587384320345
// Không cần phải giống 100%, nhưng càng giống càng tốt và phải có tính thẩm mỹ
// Illustration có thể tải ở đây https://undraw.co/illustrations hoặc các nguồn khác và upload lên Glitch assets
// Cần làm:
// - Màn hình danh sách todo list, nếu trống thì hiển thị một hình nào đó như trong ảnh
// - Khi ấn nút + để tạo todo mới thì hiển thị modal có chứa 1 text input và nút để add
// - Khi ấn vào 1 item thì sẽ toggle trạng thái isDone của nó
// - Nếu isDone là true thì cho vào danh sách Finished, còn không thì ở Upcoming

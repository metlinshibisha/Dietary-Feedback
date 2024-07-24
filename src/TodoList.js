import React, { useState } from 'react';
import './ToolList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const getCurrentTime = () => {
    return new Date().toLocaleString();
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      if (editIndex === -1) {
        const newTodo = {
          text: inputValue,
          createTime: getCurrentTime(),
          updateTime: null,
        };
        setTodos([...todos, newTodo]);
      } else {
        const updatedTodos = todos.map((todo, index) => {
          if (index === editIndex) {
            return {
              ...todo,
              text: inputValue,
              updateTime: getCurrentTime(),
            };
          }
          return todo;
        });
        setTodos(updatedTodos);
        setEditIndex(-1);
      }
      setInputValue('');
    }
  };

  const handleEditTodo = (index) => {
    setInputValue(todos[index].text);
    setEditIndex(index);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setEditIndex(-1); 
  };

  return (
    <div className="todo-list-container">
      <h2>FEEDBACK REQUESTED-YOUR INPUT,PLEASE!</h2>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your feedback..."
        />
        <button onClick={handleAddTodo}>
          {editIndex === -1 ? 'Add Feedback' : 'Update feedback'}
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <div>{todo.text}</div>
            <div>Created: {todo.createTime}</div>
            {todo.updateTime && <div>Updated: {todo.updateTime}</div>}
            <div>
              <button onClick={() => handleEditTodo(index)}>Edit</button>
              <button onClick={() => handleDeleteTodo(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

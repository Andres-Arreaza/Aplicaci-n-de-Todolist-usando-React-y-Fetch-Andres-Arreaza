import React, { useState, useEffect } from "react";
import { Footer } from '../component/footer.jsx';
import '../../styles/index.css';

const API_URL = 'https://assets.breatheco.de/apis/fake/todos/user/your_username';

const Home = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // Cargar tareas desde la API cuando el componente se monta
  useEffect(() => {
    fetch(API_URL)
      .then(resp => resp.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          setTodos([]);
        }
      })
      .catch(error => console.log(error));
  }, []);

  // Sincronizar tareas con la API
  const syncTodos = (newTodos) => {
    fetch(API_URL, {
      method: "PUT",
      body: JSON.stringify(newTodos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  };

  // Agregar tarea
  const addTodo = () => {
    if (todo.trim()) {
      const newTodos = [...todos, { label: todo, done: false }];
      setTodos(newTodos);
      syncTodos(newTodos);
      setTodo("");
    }
  };

  // Eliminar tarea
  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    syncTodos(newTodos);
  };

  // Limpiar todas las tareas
  const clearTodos = () => {
    const newTodos = [];
    setTodos(newTodos);
    syncTodos(newTodos);
  };

  return (
    <div className="card">
      <h1 className="title">Todos</h1>
      <div className="container">
        <div className="container-input">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            className="input"
            placeholder="What needs to be done?"
          />
        </div>
        <ul className="todo-list">
          {todos.length === 0 ? (
            null
          ) : (
            todos.map((item, index) => (
              <li
                key={index}
                className="todo-item"
                onMouseEnter={(e) => e.currentTarget.querySelector('.delete-icon').style.display = 'inline'}
                onMouseLeave={(e) => e.currentTarget.querySelector('.delete-icon').style.display = 'none'}
              >
                {item.label}
                <span
                  className="delete-icon"
                  onClick={() => removeTodo(index)}
                >
                  <i className="bi bi-x-lg"></i>
                </span>
              </li>
            ))
          )}
        </ul>
        <p className="todo-count">{todos.length} Item left</p>
        <button className="border border-dark border-2 rounded" onClick={clearTodos}>Clear All</button>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

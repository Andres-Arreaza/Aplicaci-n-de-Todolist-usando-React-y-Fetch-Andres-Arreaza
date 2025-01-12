import React, { useState, useEffect } from "react";

const TodoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const BASE_URL = "https://playground.4geeks.com/todo/";

    const createUser = async () => {
        try {
            const response = await fetch(`${BASE_URL}users/AGNDev`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            await response.json();
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const getTodos = async () => {
        try {
            const response = await fetch(`${BASE_URL}users/AGNDev`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 404) {
                await createUser();
            } else {
                const data = await response.json();
                setTodos(data.todos);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const createTodo = async () => {
        try {
            await fetch(`${BASE_URL}todos/AGNDev`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "label": inputValue, "is_done": false }),
            });

            await getTodos();
            setInputValue("");
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await fetch(`${BASE_URL}todos/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            await getTodos();
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div className="todo-container">
            <span className="title">ToDo List</span>
            <ul className="todo-list">
                <li className="todo-input">
                    <input
                        type="text"
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && inputValue.trim()) {
                                createTodo();
                            }
                        }}
                        placeholder="What needs to be done?"
                    />
                </li>
                {todos.length === 0 ? (
                    <li className="todo-empty">There are no saved tasks!!!</li>
                ) : (
                    todos.map((item) => (
                        <li key={item.id} className="todo-item">
                            {item.label}
                            <button
                                className="todo-remove"
                                onClick={() => deleteTodo(item.id)}
                            >
                                ✖
                            </button>
                        </li>
                    ))
                )}
                <li className="todo-count">{todos.length} item left</li>
            </ul>
        </div>
    );
};

export default TodoList;

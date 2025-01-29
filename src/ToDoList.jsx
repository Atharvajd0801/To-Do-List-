import { useState, useEffect } from 'react';

function ToDoList() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentTaskIndex, setCurrentIndex] = useState(null);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        setTasks([...tasks, { text: task, completed: false }]);
        setTask("");
    };

    const editTask = (index) => {
        setTask(tasks[index].text);
        setEdit(true);
        setCurrentIndex(index);
    };

    const updateTask = () => {
        const updatedTasks = tasks.map((t, index) =>
            index === currentTaskIndex ? { ...t, text: task } : t
        );
        setTasks(updatedTasks);
        setEdit(false);
        setTask("");
        setCurrentIndex(null);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const toggleCompleteTask = (index) => {
        const updatedTasks = tasks.map((t, i) =>
            i === index ? { ...t, completed: !t.completed } : t
        );
        setTasks(updatedTasks);
    };

    return (
        <div>
            <h1>To Do List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add or edit a task"
            />
            <button onClick={edit ? updateTask : addTask}>
                {edit ? 'Update Task' : 'Add Task'}
            </button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.text}
                        <button onClick={() => editTask(index)}>Edit</button>
                        <button onClick={() => deleteTask(index)}>Delete</button>
                        <button onClick={() => toggleCompleteTask(index)}>
                            {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ToDoList;
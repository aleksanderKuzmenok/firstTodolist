import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';

export type filterType = 'all' | 'active' | 'completed'
export type taskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    const [filter, setFilter] = useState<filterType>('all')
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: true},
    ])
    const resetTD = () => {
        setTasks([...tasks])
    }
    const removeTask = (id: string) => {
        setTasks(tasks.filter(f => f.id !== id))
    }

    let durshlak = tasks
    if (filter === 'active') {
        durshlak = tasks.filter(f => !f.isDone)
    }
    if (filter === 'completed') {
        durshlak = tasks.filter(f => f.isDone)
    }
    const filteredTask = (value: filterType) => {
        setFilter(value)
    }
    const addTask = (titleValue: string) => {
        let newTask = {id: v1(), title: titleValue, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeStatus = (id: string, value: boolean) => {
        setTasks(tasks.map(m=>m.id===id ? {...m, isDone: value} : m))
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={durshlak}
                removeTask={removeTask}
                filteredTask={filteredTask}
                addTask={addTask}
                changeStatus={changeStatus}
                resetTD={resetTD}
                filter={filter}
            />
        </div>
    );
}

export default App;

import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {filterType, taskType} from "./App";
import styles from './Todolist.module.css'

type todolistType = {
    title: string
    tasks: Array<taskType>
    removeTask: (id: string) => void
    filteredTask: (value: filterType) => void
    addTask: (titleValue: string) => void
    changeStatus: (id: string, value: boolean) => void
    resetTD: () => void
    filter: filterType
}

export const Todolist = ({title, tasks, removeTask, filteredTask, addTask, changeStatus, ...props}: todolistType) => {
    const [titleValue, setTitleValue] = useState('')
    const [error, setError] = useState(false)

    const onClickHandler = (id: string) => {
        removeTask(id)
    }
    const onClickHandlerForFilter = (value: filterType) => {
        filteredTask(value)
    }
    const onClickHandlerForAddTask = (titleValue: string) => {
        if (titleValue.trim()) {
            addTask(titleValue.trim())
            setTitleValue('')

        } else {
            setError(true)
        }
    }
    const onChangeHandlerForInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickHandlerForAddTask(titleValue)
        }
    }
    const onChangeForStatus = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(id, e.currentTarget.checked)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error ? styles.error : ''} value={titleValue} onKeyPress={onKeyPressHandler}
                       onChange={onChangeHandlerForInput}/>
                <button onClick={() => onClickHandlerForAddTask(titleValue)}>+</button>
                {error && <div className={styles.errorMessage}>Title is required</div>}
            </div>
            <ul>
                {tasks.map(m => {
                    return (
                        <li key={m.id} className={m.isDone ? styles.isDone : ''}>
                            <input type="checkbox"
                                   onChange={(e) => onChangeForStatus(m.id, e)}
                                   checked={m.isDone}
                            />
                            <span>{m.title}</span>
                            <button onClick={() => onClickHandler(m.id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? styles.button : ''}
                        onClick={() => onClickHandlerForFilter('all')}>All
                </button>
                <button className={props.filter === 'active' ? styles.button : ''}
                        onClick={() => onClickHandlerForFilter('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? styles.button : ''}
                        onClick={() => onClickHandlerForFilter('completed')}>Completed
                </button>
            </div>
        </div>

    )
}
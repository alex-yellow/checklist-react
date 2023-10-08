import React, { useState } from "react";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState('');
  const [edit, setEdit] = useState(-1);

  function changeValue(event) {
    setValue(event.target.value);
  }
  function addTask() {
    if (value.trim() === '') return;
    const copy = [...tasks];
    const newTask = {
      text: value,
      isDone: false
    }
    setTasks([...copy, newTask]);
    setValue('');
  }
  function delTask(index) {
    const copy = [...tasks];
    copy.splice(index, 1);
    setTasks(copy);
  }
  function doneTask(index) {
    const copy = [...tasks];
    copy[index].isDone = !copy[index].isDone;
    setTasks(copy);
  }
  function editTask(index) {
    const copy = [...tasks];
    setEdit(index);
    setValue(copy[index].text);
  }
  function taskEdit() {
    const copy = [...tasks];
    copy[edit].text = value
    setTasks(copy);
    setEdit(-1);
    setValue('');
  }
  const res = tasks.map(function (task, index) {
    return <li key={index}>
      <span className={task.isDone && 'check'}>{task.text}</span>
      <span><button onClick={() => delTask(index)}>Del</button></span>
      <span><button onClick={() => doneTask(index)}>{task.isDone ? 'Undone' : 'Done'}</button></span>
      <span><button onClick={() => editTask(index)}>Edit</button></span>
    </li>
  });
  return (
    <div>
      <h1>CheckList</h1>
      <input type="text" value={value} onChange={event => changeValue(event)} />
      <button onClick={edit !== -1 ? taskEdit : addTask}>{edit !== -1 ? 'edit' : 'add'}</button>
      <ul>
        {res}
      </ul>
    </div>
  )
}

export default App;

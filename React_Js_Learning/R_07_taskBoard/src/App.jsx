import React, { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';

function App() {
  const [addingTask, setAddingTask] = useState([]);

  const addTask = (newTask) => {
    setAddingTask((prev) => [...prev, newTask]);
  };

  const deleteTask = (indexToDelete) => {
    const updatedTasks = addingTask.filter(
      (_, index) => index !== indexToDelete
    );
    setAddingTask(updatedTasks);
  };

  return (
    <div>
      <h2>Task Dashboard</h2>
      <TaskInput onAdd={addTask} />
      <TaskList taskFromCompo={addingTask} onDelete={deleteTask} />
      <TaskStats count={addingTask.length}/>
    </div>
  );
}
export default App;

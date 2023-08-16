import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([
  
    {
      id: 1,
      text: 'Grocery Shopping',
      day: 'Sep 15th at 7:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Job Interview',
      day: 'Sep 16th at 10:30am',
      reminder: true,
    },
    {
      id: 3,
      text: 'Jogging',
      day: 'Sep 16th at 6:30pm',
      reminder: false,
    }
  ])



  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000 + 1)
    const newTask = { id, ...task}
    setTasks([...tasks, newTask])

  }


  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id != id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    )
  }


  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask
            (!showAddTask)}
          showAdd={showAddTask}
        />

        <Routes>
          <Route path='/' element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
              )
                : (
                  'No Tasks To Show'
                )}
            </>
          } />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

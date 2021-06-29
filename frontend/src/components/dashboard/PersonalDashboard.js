// imports
import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";

export default function PersonalDashboard() {

  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const userId = localStorage.getItem("userId");
  const groupId = localStorage.getItem("groupId");
  const owner = localStorage.getItem("owner");
  const [name, setName] = useState("");

  // get personal tasks
  // get all tasks
  useEffect(() => {
    async function getTasks() {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
        params: {
          userId,
        },
      };

      try {
        const { data } = await axios.get("/api/dashboard/:id", config);

        const tasks = data.tasks.filter((task) => {
          return task.completed === false;
        })
        const newTasks = data.tasks.filter((task) => {
          return task.completed === true;
        })
        setCompletedTasks(newTasks)
        setTasks(tasks);
      } catch (error) {
        console.log(error);
      }
    }
    getTasks();
  }, [userId]);

  // add task
  async function handleSubmit(e) {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const url = `/api/dashboard/${userId}`
      await axios.post(
        url,
        { name, groupId, userId, owner },
        config
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Nav />
      <section className="page">
        <h1>Personal Dashboard For</h1>
        <h1>Tasks</h1>
        <div className="container">
          <div className="todo">
            <h1>To Do</h1>
            {tasks.map((task) => {
              return (

                <div key={task._id} className="tasks">
                  <h3 className="task-title">{task.name}</h3>
                  <p className="task-owner">{task.owner}</p>
                </div>
              )
            })}
          </div>
          <div className="done">
            <h1>Done</h1>
            {completedTasks.map((task) => {
              return (
                <div key={task._id} className="tasks">
                  <h3 className="task-title">{task.name}</h3>
                  <p className="task-owner">{task.owner}</p>
                </div>
              )
            })}
          </div>

        </div>

        <Link to="/add-task"><button>Add Task</button></Link>
        <Link to="/dashboard">Dashboard</Link>
      </section>
    </>
  );
}

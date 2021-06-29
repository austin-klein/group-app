// imports
import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Nav from "../Nav";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const groupId = localStorage.getItem("groupId");
  const userId = localStorage.getItem("userId");

  // get all tasks
  useEffect(() => {
    async function getTasks() {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
        params: {
          groupId,
        },
      };

      try {
        const { data } = await axios.get("/api/dashboard", config);

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
  }, [groupId]);

  return (
    <>
      <Nav />
      <section className="page">
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
        <Link to={`/dashboard/${userId}`}>Back to personal dashboard</Link>
      </section>
    </>
  );
}

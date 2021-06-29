// imports
import React, { useState, useEffect } from "react";
import "./dashboard.css";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
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
        setTasks(data.tasks);
      } catch (error) {
        console.log(error);
      }
    }
    getTasks();
  }, [groupId]);

  return (
    <section className="dashboard">
      <h1>Dashboard</h1>
      <h1>Tasks</h1>
      <div className="container">
        {tasks.map((task) => {
          return (
            <div key={task._id} className="tasks">
              <h3>{task.name}</h3>
              <p>{task.owner}</p>
            </div>
          )
        })}
      </div>
      <Link to={`/dashboard/${userId}`}>Back to personal dashboard</Link>
    </section>
  );
}

// imports
import React, { useState, useEffect } from "react";
import "./personalDashboard.css";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";

export default function PersonalDashboard() {

  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem("userId");
  const groupId = localStorage.getItem("groupId");
  const owner = localStorage.getItem("owner");
  const [name, setName] = useState("");

  // get personal tasks
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
        setTasks(data.tasks);
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
    <section className="personal">
      <h1>Personal Dashboard For</h1>
      <h1>Tasks</h1>
      {tasks.map((task) => {
        return <p key={task._id}>{task.name}</p>
      })}
      <h1>Add Task</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/dashboard">Dashboard</Link>
    </section>
  );
}

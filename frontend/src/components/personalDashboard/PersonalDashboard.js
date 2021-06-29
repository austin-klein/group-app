// imports
import React, { useState, useEffect } from "react";
import "./personalDashboard.css";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
// component
export default function PersonalDashboard() {
  // component logic
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function getUsers() {
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
        console.log(data);
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  // component JSX
  return (
    <>
      <h1>Personal Dashboard</h1>
      <Link to="/dashboard">Dashboard</Link>
    </>
  );
}

// imports
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./profile.css";
import axios from "../../utils/axios";

// component
export default function Login() {
  // component logic
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const groupId = localStorage.getItem("groupId");
  const history = useHistory();

  useEffect(() => {
    async function getUsers() {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
        params: {
          groupId,
        },
      };

      try {
        const { data } = await axios.get("/api/users", config);
        console.log(data.users);
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/users",
        { name, groupId },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function userRoute(userId) {
    console.log(userId);
    localStorage.setItem("userId", userId);
    history.push(`/dashboard/${userId}`);
  }

  function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("groupId");
    history.push("/");
  }

  // component JSX
  return (
    <>
      <h1>Profile Page</h1>
      <div className="profiles">
        {users.map((user) => {
          return (
            <button
              onClick={() => {
                userRoute(user._id);
              }}
              key={user._id}
            >
              {user.name}
            </button>
          );
        })}
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      <button
        onClick={() => {
          logout();
        }}
      >
        LOGOUT
      </button>
    </>
  );
}

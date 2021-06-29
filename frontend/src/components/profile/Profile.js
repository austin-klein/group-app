// imports
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./profile.css";
import axios from "../../utils/axios";

export default function Login() {

  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const groupId = localStorage.getItem("groupId");
  const history = useHistory();

  // get all users
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
  }, [groupId]);

  async function handleSubmit(e) {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(
        "/api/users",
        { name, groupId },
        config
      );
    } catch (error) {
      console.log(error);
    }
  }

  // route to user page
  function userRoute(userId, name) {

    localStorage.setItem("userId", userId);
    localStorage.setItem("owner", name);
    history.push(`/dashboard/${userId}`);
  }

  // logout and clear storage
  function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("groupId");
    localStorage.removeItem("userId");
    localStorage.removeItem("owner");
    history.push("/");
  }

  return (
    <section className="profile">
      <h1>Profiles for </h1>
      <div className="profiles">
        {users.map((user) => {
          return (
            <button className="profiles"
              onClick={() => {
                userRoute(user._id, user.name);
              }}
              key={user._id}
            >
              {user.name}
            </button>
          );
        })}
      </div>
      <h1>Add a profile</h1>
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
      <button style={{ background: "red" }}
        onClick={() => {
          logout();
        }}
      >
        LOGOUT
      </button>
    </section>
  );
}

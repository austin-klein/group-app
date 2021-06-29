// imports
import React, { useState } from "react";
import "./login.css";
import { useHistory, Link } from "react-router-dom";
import axios from "../../utils/axios";

// component
export default function Login() {
  // component logic
  const [groupName, setGroupName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  // login function
  async function handleSubmit(e) {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/login",
        { groupName, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("groupId", data.group._id);
      history.push("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="login">
      <h1>Login Page</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/register">Don't have an account? Register</Link>
    </section>
  );
}

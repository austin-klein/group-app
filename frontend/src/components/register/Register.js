// imports
import React, { useState } from "react";
import "./register.css";
import { useHistory, Link } from "react-router-dom";
import axios from "../../utils/axios";

export default function Login() {

  const [groupName, setGroupName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  // register function
  async function handleSubmit(e) {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/register",
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
    <section className="page">
      <h1>Register</h1>
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
      <Link to="/login">Already have an account? Login</Link>
    </section>
  );
}

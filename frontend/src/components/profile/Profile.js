// imports
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./profile.css";
import Nav from "../Nav";
import axios from "../../utils/axios";

export default function Profile() {

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


  // route to user page
  function userRoute(userId, name) {

    localStorage.setItem("userId", userId);
    localStorage.setItem("owner", name);
    history.push(`/dashboard/${userId}`);
  }

  return (
    <>
      <Nav />
      <section className="page">
        <h1>Groups | GroupName</h1>
        <div className="profiles">
          {users.map((user) => {
            return (
              <div className="profiles"
                onClick={() => {
                  userRoute(user._id, user.name);
                }}
                key={user._id}
              >
                {user.name}
              </div>
            );
          })}
        </div>
        <Link to="/add-profile">Add a profile</Link>

      </section>
    </>
  );
}

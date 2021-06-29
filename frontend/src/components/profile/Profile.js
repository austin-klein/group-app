// imports
import React, { useState, useEffect } from "react";
import "./profile.css";
import axios from "../../utils/axios";

// component
export default function Login() {
    // component logic
    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const config = {
                header: {
                    'Content-Type': 'application/json'
                }
            }

            try {
                const { data } = await axios.get('/api/users', config);
                console.log(data.users);
                setUsers(data.users);
            } catch (error) {
                console.log(error);
            }
        }
        getUsers();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        /// GET GROUP ID FROM LOCAL STORAGE
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post('/api/users', { name }, config);
            console.log(data);
        } catch (error) {
            console.log(error);
        }

    };

    // component JSX
    return (
        <>
            <h1>Profile Page</h1>
            <div className="profiles">
                {users.map((user) => {
                    return <p key={user._id}>{user.name}</p>
                })}
            </div>
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

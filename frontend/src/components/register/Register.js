// imports
import React, { useState } from "react";
import "./register.css";
import axios from "../../utils/axios";

// component
export default function Login() {
    // component logic
    const [groupName, setGroupName] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const { data } = await axios.post('/api/register', { groupName, password }, config);
            console.log(data.token);
        } catch (error) {
            console.log(error);
        }

    };

    // component JSX
    return (
        <>
            <h1>Register Page</h1>
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => { setGroupName(e.target.value) }}
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

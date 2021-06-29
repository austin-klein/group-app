// imports
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../utils/axios";

export default function AddTask() {

    const userId = localStorage.getItem("userId");
    const groupId = localStorage.getItem("groupId");
    const owner = localStorage.getItem("owner");
    const [name, setName] = useState("");
    const history = useHistory();


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
            history.push(`/dashboard/${userId}`)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <section className="page">

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
            </section>
        </>
    );
}

// imports
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./profile.css";
import axios from "../../utils/axios";

export default function AddProfile() {

    const [name, setName] = useState("");
    const groupId = localStorage.getItem("groupId");
    const history = useHistory();

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
            history.push("/profile");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <section className="page">
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

        </section>
    );
}

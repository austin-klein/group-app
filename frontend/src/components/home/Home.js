// imports
import React from "react";
import "./home.css"
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <section className="page">
            <h1>Welcome to Groups</h1>
            <div className="links">
                <Link to="/login">Login</Link>
                <Link to="/Register">Register</Link>
            </div>


        </section>
    )
}

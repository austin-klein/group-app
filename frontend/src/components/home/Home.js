// imports
import React from "react";
import "./home.css"
import { Link } from 'react-router-dom';

// component
export default function Home() {
    return (
        <>
            <h1>Homepage</h1>
            <Link to="/login">Login</Link>
            <Link to="/Register">Register</Link>
        </>
    )
}

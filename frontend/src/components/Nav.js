// imports
import React from "react";
import { useHistory, Link } from 'react-router-dom';

export default function Nav() {
    const history = useHistory();

    // logout and clear storage
    function logout() {
        localStorage.removeItem("authToken");
        localStorage.removeItem("groupId");
        localStorage.removeItem("userId");
        localStorage.removeItem("owner");
        history.push("/");
    }

    return (
        <nav>
            <h3>Groups</h3>
            <button onClick={() => { logout() }}><Link to="/">Logout</Link></button>
        </nav>
    )
}

import React from 'react'
import {Link} from "react-router-dom";
import "./style.css";

function Nav() {
    return <ul className="nav-menu">
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/view-plan">View Plan</Link>
        </li>
        <li>
            <Link to="/create-plan">Create Plan</Link>
        </li>
        <li >
            <span className="nav__brand">Plan?</span>
        </li>
    </ul>
}

export default Nav

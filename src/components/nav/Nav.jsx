import React from 'react'
import {Link} from "react-router-dom";
import "./style.css";
import GitHubIcon from '@material-ui/icons/GitHub';
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
        <li>
            <Link to="/test">Test</Link>
        </li>
        <li >
            <a target="_blank" href="https://github.com/ats1999/drone-route-planning/tree/main"><GitHubIcon/></a>
        </li>
    </ul>
}

export default Nav

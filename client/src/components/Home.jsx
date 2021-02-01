import React from 'react'
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import "./home.css";
import {ButtonGreenElivated} from "./Button";

const useStyles = makeStyles({
    headingText:{
        color:"white"
    },
    yellowText:{
        color:"yellow"
    }
})
function Home() {
    const classes = useStyles();
    return (
        <div className="root">
            <Typography className={classes.headingText} component="h1" variant="h2">
                Create route plan 
            </Typography>
            <Typography className={classes.yellowText} component="h1" variant="h4">
                Weather you want to create plan for your drone or any other air mission, this software will ease you work.
                Create plan and get the coordinates for your plan.
            </Typography>
            <Link to="/create-plan">
                <ButtonGreenElivated/>
            </Link>
        </div>
    )
}

export default Home

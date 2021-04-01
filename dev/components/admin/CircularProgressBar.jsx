import { CircularProgressbarWithChildren  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

const CircularProgressBar=({number,text,icon,lg})=>{
    return <Grid item lg={lg}>
        <div style={{
                padding:"0px",maxWidth:"80px",
                marginLeft:'auto', marginRight:"auto"
            }}>
        <CircularProgressbarWithChildren value={100}>
            {icon}
            <div style={{ textAlign:"center", fontSize: 9, marginTop: 5,overflow:"hidden",maxWidth:"100%" }}>
                <strong>{number}</strong> {text}
            </div>
        </CircularProgressbarWithChildren>
    </div>
    </Grid>
}
CircularProgressBar.propTypes = {
    number:PropTypes.number.isRequired,
    text:PropTypes.string.isRequired,
    icon:PropTypes.node.isRequired,
    lg:PropTypes.number
}

CircularProgressBar.defaultProps = {
    lg:4
}
export default CircularProgressBar;
import { CircularProgressbarWithChildren  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DescriptionIcon from '@material-ui/icons/Description';
import FaceIcon from '@material-ui/icons/Face';
import WavesTwoToneIcon from '@material-ui/icons/WavesTwoTone';

const CircleProgressBar=({number,text})=>{
    return <div style={{
                padding:"0px",maxWidth:"130px"
            }}>
        <CircularProgressbarWithChildren value={number+1000}>

        {text==="published"?<DescriptionIcon color="primary"/>:
        text==="views"?<FaceIcon  color="error"/>:
        <WavesTwoToneIcon color="secondary"/>}

        <div style={{ textAlign:"center", fontSize: 9, marginTop: 5,overflow:"hidden",maxWidth:"100%" }}>
            <strong>{number}</strong> {text}
        </div>
        </CircularProgressbarWithChildren>
    </div>
}

export default CircleProgressBar;
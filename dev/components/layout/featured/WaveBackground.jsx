import {useState,useEffect} from "react";
import style from "../style/wave.module.css";
import Typography from "@material-ui/core/Typography";
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css";
import Typist from 'react-typist';

const sectionStyle={
    paddingTop:"30px",
    position: 'relative',
    width: '100%',
    height: '40vh',
    background: '#556cd6', //#3544ff, #35aaff
    overflow: 'hidden',
    margin:"0px"
}

const waveStyle={
    height:"100px",
    width:"100%",
    position:"absolute",
    bottom:"0",
    left:"0",
    overflow:"hidden",
    backgroundImage:`url(/images/layout/wave.png)`,
    backgroundSize:"1000px 100px"
}
const TypingReact=({setResetTyping})=>{
    return <Typist onTypingDone={()=>setResetTyping(null)}
            >
        <Typography className={style.third__typography} align="center" variant="h4" component="h4">
            for dev's
        </Typography>
        <Typist.Backspace count={9} delay={200} />
        <Typography className={style.third__typography} align="center" variant="h4" component="h4">
            for hard coders
        </Typography>
        <Typist.Backspace count={15} delay={200} />
        <Typography className={style.third__typography} align="center" variant="h4" component="h4">
            for story writer
        </Typography>
        <Typist.Backspace count={16} delay={200} />
        <Typography className={style.third__typography} align="center" variant="h4" component="h4">
            for seekers
        </Typography>
        <Typist.Backspace count={11} delay={200} />
    </Typist>
}
const WaveBackground=()=>{
    const [resetTyping, setResetTyping] = useState(null);
    const [waveHeight, setWaveHeight] = useState('60vh');
    useEffect(()=>{
        setResetTyping(<TypingReact setResetTyping={setResetTyping}/>)
	setWaveHeight(document.body.clientWidth>450?"60vh":"55vh")
    },[])

    useEffect(()=>{
        if(resetTyping==null)
            setResetTyping(<TypingReact setResetTyping={setResetTyping}/>)
    },[resetTyping])

    return   <ScrollAnimation animateIn="fadeInDown" animateOnce={true} duration={1}>
            <section style={{...sectionStyle,height:waveHeight}} className="section">
                <ScrollAnimation animateIn="fadeInDown" animateOnce={true} duration={0.5} delay={500}>
                    <Typography className={style.main__typography} component="h1" variant="h2" align="center">
                        B-Dev-G
                    </Typography>
                </ScrollAnimation>

                <ScrollAnimation animateIn="fadeInUp" animateOnce={true} delay={1000}>
                    <Typist>
                        <Typography className={style.second__typography} align="center" variant="h3" component="h4">
                            A crafted space 
                        </Typography>
                    </Typist>
                    {resetTyping}
                </ScrollAnimation>
                <h1 style={{textAlign:"center"}}></h1>
                <div style={waveStyle} className={style.wave1}></div>
                <div style={waveStyle} className={style.wave2}></div>
                <div style={waveStyle} className={style.wave3}></div>
                <div style={waveStyle} className={style.wave4}></div>
            </section>
        </ScrollAnimation>
}
export default WaveBackground;

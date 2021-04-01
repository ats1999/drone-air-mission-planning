import React,{useEffect,useState} from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography,Fab } from '@material-ui/core';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css";
import style from "./style/header.module.css";
import WaveBackground from "./featured/WaveBackground";
import ArticleSection from "./featured/ArticleSection";

const useStyles = makeStyles((theme) => ({
    root:{
      padding:"10px"
    },
    welcomeText:{
      color:"gray",
      padding:"10px",
      textAlign:"center",
      textShadow:`1px 0px 1px #ccc, 0px 1px 1px #eee, 
      2px 1px 1px #ccc, 1px 2px 1px #eee,
      3px 2px 1px #ccc, 2px 3px 1px #eee,
      4px 3px 1px #ccc, 3px 4px 1px #eee,
      5px 4px 1px #ccc, 4px 5px 1px #eee,
      6px 5px 1px #ccc, 5px 6px 1px #eee,
      7px 6px 1px #ccc`
    }
}));

let images = [], testi=[];
images.push(<Grid item xs={12} sm={12}  >
  <ScrollAnimation animateIn="fadeInUp" animateOnce={true} offset={0} delay={500}  >
      <img  src={"https://res.cloudinary.com/bdevg/image/upload/v1617254222/bdevg-home/chat-app_jkdsvn.jpg"} className={style.header__image} alt="" />
  </ScrollAnimation>
</Grid>);

images.push(<Grid item xs={12} sm={12} >
    <ScrollAnimation animateIn="fadeInUp" animateOnce={true} offset={0} delay={500}  >
      <img  src={"https://res.cloudinary.com/bdevg/image/upload/v1617254221/bdevg-home/open-source_cp7ffz.svg"} className={style.header__image} alt="" />
    </ScrollAnimation>
  </Grid>)
images.push(<Grid item xs={12} sm={12} >
  <ScrollAnimation animateIn="fadeInUp" animateOnce={true} offset={0} delay={500}  >
    <img style={{
      borderRadius:"20%",
      boxShadow:"0px 10px 10px 0px #7f4f4f"
    }} src={"https://res.cloudinary.com/bdevg/image/upload/v1617254225/bdevg-home/math_pui0ab.jpg"} className={style.header__image} alt="" />
  </ScrollAnimation>
</Grid>)

testi.push(<Grid item xs={12} sm={12} >
  <ScrollAnimation animateIn="fadeInUp" animateOnce={true} offset={0} delay={500}  >
      <Typography color="primary" variant="h5" component="h2">
          The <span style={{color:"red"}}>best</span> way to find yourself is to <span style={{color:"red"}}>lose your self</span> in the service of others.
      </Typography>
      <Typography  variant="body1" component="h2">
        <span style={{color:"#10025c"}}>Create instant connections with proactive peoples.</span> <br/> 
      </Typography>
  </ScrollAnimation>
</Grid>)

testi.push(<Grid item xs={12} sm={12} >
  <ScrollAnimation animateIn="fadeInUp" animateOnce={true} offset={0} delay={500}  >
      <div>
          <Typography variant="h5" component="h2">
            <span style={{color:"white"}}>The Ultimate Communication Hub</span>
          </Typography>
          <Typography variant="body1" component="h3">Control your communication, 
              manage your data, share you knowledge,
               collaboration with the world for 
               productivity. We listen to reply.
          </Typography>
      </div>
      </ScrollAnimation>
</Grid>)

testi.push(<Grid item xs={12} sm={12} >
  <ScrollAnimation animateIn="fadeInUp" animateOnce={true} offset={0} delay={500}  >
      <div>
          <Typography color="primary" variant="h5" component="h2">
            It is easy to make things look hard but hard to make things look easy.
          </Typography>
          <Typography variant="body1" component="h5">
              <span style={{color:"#c000de"}}>Everything</span> gets easier when you <span style={{color:"#c000de"}}>stop expecting</span> it to be <span style={{color:"#c000de"}}>easy</span>.
          </Typography>
      </div>
      </ScrollAnimation>
</Grid>)

function Header() {
    const classes = useStyles();

    return <>
      <WaveBackground/>
        <div className={classes.welcomeText}>
          <Typography variant="h3" component="h2">
            Welcome to binary developer group
          </Typography>
        </div>
      <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid container item sm={12} md={4}>
          {images[0]}
          {testi[0]}
        </Grid> 
        <Grid container item className={`${style.header__grid__item} ${style.redBg} ${style.whiteColor}`}  sm={12} md={4}>
          {images[1]}
          {testi[1]}
        </Grid>

        <Grid container item   sm={12} md={4}>
          {images[2]}
          {testi[2]}
        </Grid>
      </Grid>
    </div>
    <ArticleSection/>
    </>
}

export default Header

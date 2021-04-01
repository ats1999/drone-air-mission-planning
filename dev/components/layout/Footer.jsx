import React,{useState} from 'react';
import Link from "next/link";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css";
import {isElementInViewPort} from "@utils/util";
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '50vh',
    marginTop:"100px",
    padding:"20px"
  },
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  linkGrid:{
    backgroundColor:"black",
    color:"white"
  }
}));
const WrappedLink=({url,children})=>{
  return <>
    <Link href={url}>
        <a>{children}</a>
    </Link>
    <br/>
  </>
}
function Copyright() {
  return <div>
            <Typography align="center" variant="body2" color="textSecondary">
              {'Copyright © '}
              <Link color="inherit" href="#">
                www.bdevg.com
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
    </div>
}


export default function Footer() {
  const classes = useStyles();
  const [isFooterInViewport, setIsFooterInViewport] = useState(false);

  // useEffect(()=>{
  //   setInterval(()=>{
  //       if(isElementInViewPort(document.getElementById("footer")))
  //         setIsFooterInViewport(true)
  //       else setIsFooterInViewport(false);
  //       console.log("Footer",isElementInViewPort(document.getElementById("footer")))
  //   },5000)
  // },[]);

  return (
    <div className={classes.root} id="footer">
      <CssBaseline />
      <ScrollAnimation animateIn="fadeInUp" animateOnce={true} duration={1}>
        <Container component="main" maxWidth="lg" className={classes.main}>
          <Typography align="center" variant="h4" component="h3" gutterBottom>
            We are here to <span style={{color:"blue"}}>transform the world</span>
          </Typography>
          <Typography align="center" variant="h4" component="h3" gutterBottom>
            <code>
              <span style={{color:"red"}}>while</span> (<span style={{color:"blue"}}>!</span>(weTry <span style={{color:"blue"}}>&&</span> you<span style={{color:"blue"}}>==</span>success))
            </code>
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            <code>
              {'We are commited to help everyone on out here.'}
              {'We would be happy to here anything from you.'}
            </code>
          </Typography>
          <Typography variant="body1">We can make another world.</Typography>
        </Container>

          <Grid className={classes.linkGrid} container spacing={4}>
            <Grid item lg={3} sm={6}>
              <Typography align="left" component={"h3"} variant="h6" >
                Learn
              </Typography>
              <WrappedLink url="/articles?tags=mapbox">
                Mapbox
              </WrappedLink>
              <WrappedLink url="/articles?tags=dynamodb">
                Dynamodb
              </WrappedLink>
            </Grid>
            <Grid item lg={3} sm={6}>
              <Typography align="left" component={"h3"} variant="h6" >
                You
              </Typography>
              <WrappedLink url="/auth/login">
                Login
              </WrappedLink>
              <WrappedLink url="/auth/signup">
                Sign Up
              </WrappedLink>
              <WrappedLink url="/api/auth/signout">
                Logout
              </WrappedLink>
            </Grid>
            <Grid item lg={3} sm={6}>
              <Typography align="left" component={"h3"} variant="h6" >
                B-Dev-G
              </Typography>
              <WrappedLink url="/pages/about-us?space=nosp">
                About Us
              </WrappedLink>

              <WrappedLink url="/pages/cookie">
                Cookie policy
              </WrappedLink>
              <WrappedLink url="/pages/privacy-policy">
                Privacy policy
              </WrappedLink>
              <WrappedLink url="/pages/terms-and-conditions">
                Terms and conditions
              </WrappedLink>
            </Grid>
            <Grid item lg={3} sm={6}>
              <Typography align="left" component={"h3"} variant="h6" >
                More with bdevg
              </Typography>
              <WrappedLink url="/articles/write">
                Share what you think
              </WrappedLink>

              <WrappedLink url="/articles">
                See what peers think
              </WrappedLink>
              
              <WrappedLink url="/jobs">
                Find your perfect role
              </WrappedLink>
            </Grid>
            <Grid item lg={3} sm={6}>
              <Typography align="left" component={"h3"} variant="h6" >
                Tell me more about you
              </Typography>
                <a target="_blank" href="https://github.com/bdevg/">Github</a>
            </Grid>
        </Grid>
        <footer className={classes.footer}>
          <Container maxWidth="lg">
            <Typography align="center" variant="body1">Hey, what are you waiting for...???</Typography>
            <Copyright />
          </Container>
        </footer>
      </ScrollAnimation>
    </div>
  );
}
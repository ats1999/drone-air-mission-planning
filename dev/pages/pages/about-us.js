import {useRouter} from "next/router";
import {useEffect} from "react";
import Head from "next/head";
import {updatePageViews} from "@utils/js/pageViews";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import style from "./styles/about.module.css";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    root:{
        paddingLeft:"0px",
        paddingRight:"0px"
    },
    padding:{
        padding:"10px"
    },
    vertical__centered__text:{
        lineHeight:"300px",
        [theme.breakpoints.down('xs')]:{
            lineHeight:"150PX",
            fontSize:"70px"
        }
    },
    nowrap:{
        whiteSpace:"nowrap"
    },
    div2:{
        backgroundImage:"url(https://res.cloudinary.com/bdevg/image/upload/v1608428901/expectrum-1191724_1280_tzywby.png)",
        backgroundSize:"cover",
        height:"300px",
        backgroundAttachment:"fixed"
    },
    blackColor:{
        color:"black"
    }
}))
export default function AboutUs(){
    const classes = useStyles();
    const router = useRouter();
    useEffect(()=>{
        updatePageViews(router.asPath)
    },[])
    return <>
    <Head>
        <title>B-Dev-G | World of Dev's for Dev's and by Dev's</title>
    </Head>
    
    <Container className={classes.root} maxWidth="lg">
        <div className={`${style.aboutDevDiv} ${classes.padding}`}>
            <Typography className={`${classes.vertical__centered__text} ${classes.blackColor}`} align="center" color='primary' component='h1' variant="h1">
                About <span className={classes.nowrap}>B-Dev-G</span>
            </Typography>
        </div>

        <Grid container>
            <Grid  className={`${classes.padding} ${classes.div2}`} item lg={12}>
                <Typography className={classes.blackColor} color="primary" component="h2" variant="h2">
                    Where you can learn and grow
                </Typography>

                <Typography component="p" variant='body1'>
                    Whether you already have a website or you're just getting 
                    started, learn to build for the modern web at <b>bdevg</b>. 
                    Then, apply your new skills and solutions to any personal or professional site you work on.
                </Typography>
            </Grid>

            <Grid className={`${style.passionGrid}`} item lg={12}>
                <Typography align="center" components="h2" variant='h2' color="primary">
                    Show your passion
                </Typography>
                <Typography component="p" variant="body1">
                    If you have anything to share with the dev world, then 
                    just do it here. You'll get exact thing that you want. 
                    Everything will be under your control. Just scal it...
                </Typography>
            </Grid>
        </Grid>
    </Container>
    </>
}
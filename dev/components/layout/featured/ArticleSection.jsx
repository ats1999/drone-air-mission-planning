import React from 'react';
import Link from "next/link";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography"
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css";
import Typist from 'react-typist';
const useStyles = makeStyles({
    button:{
        marginLeft:"15%",
        marginTop:"7%",
        borderRadius:"100%",
        boxShadow:"10px 0px 100px -10px #556cd6",
        fontWeight:"bold",
        '@media only screen and (max-width: 660px)':{
            marginLeft:"5%",
            marginTop:"0%",
        }
    },
    root:{
        // this is min-width
        '@media only screen and (min-width: 1300px)':{
            height:"990px"
        },
        '@media only screen and (max-width: 1200px)':{
            height:"730px"
        },
        '@media only screen and (max-width: 1100px)':{
            height:"650px"
        },
        '@media only screen and (max-width: 1000px)':{
            height:"630px"
        },
        '@media only screen and (max-width: 900px)':{
            height:"570px"
        },
        '@media only screen and (max-width: 850px)':{
            height:"510px"
        },
        '@media only screen and (max-width: 700px)':{
            height:"450px"
        },
        '@media only screen and (max-width: 650px)':{
            height:"400px"
        },
        '@media only screen and (max-width: 550px)':{
            height:"380px"
        },
        '@media only screen and (max-width: 450px)':{
            height:"300px"
        },
        '@media only screen and (max-width: 400px)':{
            height:"270px"
        }
    }
})
function ArticleSection() {
    const classes = useStyles();
    return <ScrollAnimation animateIn="fadeInTop" animateOnce={true} duration={1}>
                <div
                    className={classes.root}
                    style={{
                        backgroundImage:`url(https://res.cloudinary.com/bdevg/image/upload/v1617254224/bdevg-home/article-section_urwa1f.svg)`,
                        backgroundSize:"100%",
                        backgroundRepeat:"no-repeat",
                        width:"100%"
                    }}
                >
                    <Link href="/articles/write">
                        <Button
                            className={classes.button}
                            color="primary"
                            variant="outlined"
                            size="large"
                        >
                            <Typography component="h3" variant="h6">
                                Click to Go
                            </Typography>
                        </Button>
                    </Link>
                </div>
        </ScrollAnimation>
}

export default ArticleSection

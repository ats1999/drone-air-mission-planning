import React,{useState,useEffect} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from "axios";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import rahulValidate from "rahul-validate";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LanguageIcon from '@material-ui/icons/Language';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';
import {updatePageViews} from "@utils/js/pageViews";
import CircleProgressBar from "./CircleProgressBar";
import {getFreshUrl} from "@utils/util";
const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor:"#b1b1b11c",
        padding:"10px",
        borderRadius:"10px"
    },
    buttonBox:{
        display:"flex",
        marginTop:"10px"
    },
    viewButton:{
        marginLeft:"10px"
    },
    userProfileImage:{
        width:"100px",
        height:"100px",
        display:"block",
        borderRadius:"30%",
        marginLeft:"auto",
        marginRight:"auto"
    },
    githubIcon:{
        color:'black'
    },
    linkedinIcon:{
        color:'#0e76a8'
    },
    
    twitterIcon:{
        color:'#00acee'
    },
    gridCard:{
        padding:"10px",
        boxShadow:"0px 2px 15px 7px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);"
    },
    editLink:{
        textDecoration:"none !important",
        color:"blue"
    }
}));

const RecentArticles=()=>{
    const [articles, setArticles] = useState([]);
    useEffect(()=>{
        try{
            setArticles(JSON.parse(localStorage.recentArticles));
        }catch(e){
            console.log(e);
            setArticles(null);
        };
    },[])
    if(!articles) return <div>
            <h5>Did't get anything for you</h5>
            <h6>Might be the case</h6>
            <ul>
                <li>You have not published any article yet</li>
                <li>You might have cleared the browser cache or storage</li>
            </ul>
        </div>

    return <ul>
        {
            articles.map((article,idx)=>{
                return <li><p key={idx}>
                    <Link href={`/articles/${getFreshUrl(article.title)}/${article._id}`}>
                        <a>{article.title} view</a>
                    </Link>
                </p></li> 
            })
        }
    </ul>
}
export default function Dev({id}){
    const router = useRouter();
    const classes = useStyles();
    const [dev, setDev] = useState(null);
    const [err, setErr] = useState(false);
    const [articleMetaData, setArticleMetaData] = useState({
        totalViews:0,
        totalPublished:0
    });

    useEffect(()=>{
        updatePageViews("/dev")
    },[])
    useEffect(()=>{
        // id might be unavailabe initially
        if(id){
            try{
                setDev(JSON.parse(sessionStorage.curDev));
            }catch(e){
                console.log(e);
                axios.get(`/api/dev/${id}`)
                .then(res=>{
                    setDev(res.data);
                    try{
                        sessionStorage.curDev = JSON.stringify(res.data);
                    }catch(e){
                        console.log("While saving curDev in session storage.. /components/dev/Dev",e);
                    }
                }).catch(err=>{
                    if(err.response.status === 401)
                        router.push("/auth")
                    setErr(true)
                });
            }

            axios.get(`${process.env.NEXT_PUBLIC_META_BASE_API}/author-articles-meta/${id}`)
            .then(res=>{
                let view = 0;
                for(var i=0; i<res.data.length;i++)
                    view += res.data[i].views;

                setArticleMetaData({
                    totalViews:view,
                    totalPublished:res.data.length
                });
            }).catch(err=>{
                console.log(err);
            })
        }
    },[id])

    if(err)
        return <>
            <CssBaseline />
	    <Head>
		<title>B-Dev-G | Oh! how are you?</title>
	    </Head>
            <Container maxWidth="sm">
                 <h1>Oh! I did't found.</h1>
            </Container>
        </>

    if(!dev)
        return <>
            <CssBaseline />
	    <Head>
		<title>B-Dev-G | Wait, we are loading...</title>
	    </Head>
            <Container maxWidth="sm"><div>
                <Skeleton variant="circle" width={"30px"} height={"30px"} />
                <div style={{margin:"5px"}}></div>

                <Skeleton variant="text"  />
                <div style={{margin:"5px"}}></div>

                <Skeleton variant="text" component="h1" />
                <div style={{margin:"5px"}}></div>
                
                <Skeleton variant="text" height={"100px"} />
                <div style={{margin:"5px"}}></div>

                <div style={{display:"flex"}}>
                    <Skeleton variant="circle" width={"30px"} height={"30px"} />
                    <div style={{margin:"5px"}}></div>
                    <Skeleton variant="circle" width={"30px"} height={"30px"} />
                    <div style={{margin:"5px"}}></div>
                    <Skeleton variant="circle" width={"30px"} height={"30px"} />
                    <div style={{margin:"5px"}}></div>
                    <Skeleton variant="circle" width={"30px"} height={"30px"} />
                    <div style={{margin:"5px"}}></div>
                </div>
            </div>
            </Container>
        </>
    return <>
        <CssBaseline />
	    <Head>
		<title>B-Dev-G | Dev - {dev.fname}</title>
	    </Head>
        <Container className={`${classes.root} page__padding`} maxWidth="lg">
            <Grid container spacing={4}>
                {/* User profile */}
                <Grid item md={4} sm={12} xs={12}>
                    <Card className={classes.gridCard}>
                        <img className={classes.userProfileImage} alt="Profile picture" src={dev.pic}></img>
                        <Typography color="primary" gutterBottom component="h5" variant="caption">
                            {`${dev.fname} ${dev.lname}`}
                        </Typography>
                        <Typography gutterBottom component="p" variant="caption">
                            {dev.status}
                        </Typography>
                        <Typography gutterBottom component="p" variant="caption">
                            {dev.bio}
                        </Typography>
                        <CardActions>
                            {rahulValidate.isUrl(dev.socialMedia.github)?
                                <a target="_blank" href={dev.socialMedia.github}><GitHubIcon className={classes.githubIcon}/></a> :null  
                            }

                            {rahulValidate.isUrl(dev.socialMedia.twitter)?
                                <a target="_blank" href={dev.socialMedia.twitter}><TwitterIcon className={classes.twitterIcon}/></a> :null  
                            }

                            {rahulValidate.isUrl(dev.socialMedia.linkedin)?
                                <a target="_blank" href={dev.socialMedia.linkedin}><LinkedInIcon className={classes.linkedinIcon}/></a> :null  
                            }

                            {rahulValidate.isUrl(dev.socialMedia.website)?
                                <a target="_blank" href={dev.socialMedia.website}><LanguageIcon/></a> :null  
                            }
                            <Link href={`/dev/${id}?edit=true`}>
                                <a className={classes.editLink}>Edit</a>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item container spacing={0} md={8} sm={12}>
                    <Card className={classes.gridCard}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <p style={{fontWeight:"bold",textAlign:"center"}}>
                                    Your articles meta
                                </p>
                            </Grid>
                            
                            <Grid item md={4} sm={4} xs={4}>
                                <CircleProgressBar text="published" number={articleMetaData.totalPublished} />
                            </Grid>
                            <Grid item md={4} sm={4} xs={4}>
                                <CircleProgressBar text="views" number={articleMetaData.totalViews} />
                            </Grid>
                            <Grid item md={4} sm={4} xs={4}>
                                <CircleProgressBar text="avg view" number={Math.ceil(articleMetaData.totalViews/articleMetaData.totalPublished)} />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

                {/* Recent articles */}
                <Grid item md={12} sm={12}>
                    <Card className={classes.gridCard}>
                        <Typography color="primary" component="p" variant="body1" align="center">
                            Recent published articles
                        </Typography>
                        <RecentArticles/>
                        
                        <div style={{float:"right"}}>
                            <Link href={`/articles/dev-articles?id=${id}`}>
                                <a>view all</a>
                            </Link>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    </>
}

Dev.propTypes = {
    id:PropTypes.string.isRequired
}
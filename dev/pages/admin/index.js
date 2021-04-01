import {useRouter} from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import {useEffect,useState} from "react";
import Head from "next/head";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

import DescriptionIcon from '@material-ui/icons/Description';
import FaceIcon from '@material-ui/icons/Face';
import WavesTwoToneIcon from '@material-ui/icons/WavesTwoTone';
import WebIcon from '@material-ui/icons/Web';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {updatePageViews} from "@utils/js/pageViews";
const CircularProgressBar = dynamic(()=>import("@components/admin/CircularProgressBar"));
const useStyles = makeStyles({
    gridCard:{
        padding:"10px",
        boxShadow:"0px 2px 15px 7px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);"
    },
    pageTableRoot:{
        maxHeight:"285px",
        maxWidth:"100%",
        overflowY:"auto",
        "& .MuiTableCell-sizeSmall":{
            padding:"3px 4px 4px 4px"
        },
        "& .MuiTableCell-root":{
            padding:"0px"
        }
    }
})

const pageTabelHeading = ["#","page","views"]
export default function Admin(){
    const router = useRouter();
    const classes = useStyles();
    const [articlesMetaData, setArticlesMetaData] = useState({
        totalPublished:0,
        totalViews:0
    });

    const [pagesMetaData, setPagesMetaData] = useState({
        pages:[],
        totalPages:0,
        totalPageViews:0,
    })

    const [jobsMetaData, setJobsMetaData] = useState({
        totalAvailable:0,
        totalViews:0,
        totalApplied:0
    });

    useEffect(()=>{
        updatePageViews(router.asPath);

        // get articles meta data
        axios.get(`${process.env.NEXT_PUBLIC_META_BASE_API}/articles-meta`)
        .then(res=>{
            let views = 0;
            for(var i=0; i<res.data.length; i++)
                views += res.data[i].views;
                setArticlesMetaData({
                    totalPublished:res.data.length,
                    totalViews:views
                });
        }).catch(err=>{
            console.log(err);
        });

        // get page views
        axios.get(`${process.env.NEXT_PUBLIC_META_BASE_API}/page-views`)
        .then(res=>{
            let views = 0;
            for(var i=0; i<res.data.length; i++)
                views += res.data[i].views;

            setPagesMetaData({
                pages:res.data,
                totalPageViews:views,
                totalPages:res.data.length
            });
        }).catch(err=>{
            console.log(err);
        });

        axios.get(`${process.env.NEXT_PUBLIC_META_BASE_API}/jobs-meta`)
        .then(res=>{
            let views = 0;
            for(var i=0; i<res.data.length; i++)
                views += res.data[i].views;

            setJobsMetaData({
                totalViews:views,
                totalAvailable:res.data.length
            });
        }).catch(err=>{
            console.log(err);
        })
    },[])
    return <>
        <Head>
            <title>B-Dev-G | Admin</title>
        </Head>
        <Grid container spacing={2}>
            <Grid container spacing={1} item xs={12} sm={12} md={4}>
                <Grid item lg={12} sm={6}>
                    <Card className={classes.gridCard}>
                        <p style={{fontWeight:"bold",textAlign:"center"}}>B-Dev-G articles meta</p>
                        <Grid container spacing={1}>
                            <CircularProgressBar 
                                icon={<DescriptionIcon color="primary"/>}
                                number={articlesMetaData.totalPublished}
                                text="published"
                            />

                            <CircularProgressBar 
                                icon={<FaceIcon color="error"/>}
                                number={articlesMetaData.totalViews}
                                text="views"
                            />

                            <CircularProgressBar 
                                icon={<WavesTwoToneIcon color="secondary"/>}
                                number={Math.ceil(articlesMetaData.totalViews/articlesMetaData.totalPublished)}
                                text="avg views"
                            />
                        </Grid>
                    </Card>
                </Grid>

                <Grid item lg={12} sm={6}>
                    <Card className={classes.gridCard}>
                        <p style={{fontWeight:"bold",textAlign:"center"}}>B-Dev-G pages meta</p>
                        <Grid container spacing={1}>
                            <CircularProgressBar 
                                icon={<WebIcon color="primary"/>}
                                number={pagesMetaData.totalPages}
                                text="pages"
                            />

                            <CircularProgressBar 
                                icon={<FaceIcon color="error"/>}
                                number={pagesMetaData.totalPageViews}
                                text="views"
                            />

                            <CircularProgressBar 
                                icon={<WavesTwoToneIcon color="secondary"/>}
                                number={Math.ceil(pagesMetaData.totalPageViews/pagesMetaData.totalPages)}
                                text="avg views"
                            />
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Card className={classes.gridCard}>
                    <TableContainer className={classes.pageTableRoot}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {
                                        pageTabelHeading.map((th,idx)=>{
                                            return <TableCell key={idx}>
                                                <b>{th}</b>
                                            </TableCell>
                                        })
                                    }
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {pagesMetaData.pages.sort((page1,page2)=>page2.views-page1.views).map((page,idx)=>{
                                    return <TableRow key={idx}>
                                        <TableCell size="small" component="th" scope="row">
                                            <b>{idx}</b>
                                        </TableCell>

                                        <TableCell size="small">
                                            <Link href={page.pageUrl.split("_").join("/").split(">").join("?")}>
                                                <a>
                                                    {page.pageUrl.split("_").join("/").split(">").join("?")}
                                                </a>
                                            </Link>
                                        </TableCell>

                                        <TableCell size="small">
                                            {page.views}
                                        </TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Grid>

            {/* jobs meta data */}
            <Grid item xs={12} sm={12} md={2}>
                <Card className={classes.gridCard}>
                    <p style={{fontWeight:"bold",textAlign:"center"}}>B-Dev-G jobs meta</p>
                    <Grid container spacing={1}>
                        <CircularProgressBar 
                            icon={<DescriptionIcon color="primary"/>}
                            number={jobsMetaData.totalAvailable}
                            text="available"
                            lg={12}
                        />

                        <CircularProgressBar 
                            icon={<FaceIcon color="error"/>}
                            number={jobsMetaData.totalViews}
                            text="views"
                            lg={12}
                        />

                        <CircularProgressBar 
                            icon={<WavesTwoToneIcon color="secondary"/>}
                            number={Math.ceil(jobsMetaData.totalViews/jobsMetaData.totalAvailable)}
                            text="avg views"
                            lg={12}
                        />
                    </Grid>
                </Card>
            </Grid>
        </Grid>
        </>
}
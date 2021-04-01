import React,{useEffect,useState} from 'react';
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NotFound from "@utils/components/404";
import ConfirmDialog from "./ConfirmDialog";
import SnackBar from "@utils/components/SnackBar";
import axios from "axios";
const useStyles = makeStyles({
    root: {
      minWidth: 150,
      marginBottom:"10px"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    actions:{
        marginTop:"0px"
    },
    deleteButton:{
        color:"red"
    },
    editButton:{
        color:"green"
    }
});
function Articles({id}) {
    const classes = useStyles();
    const router = useRouter();
    const [listArticles, setlistArticles] = useState(null);
    const [originalArticles, setOriginalArticles] = useState(null);
    const [err, setErr] = useState(false);
    const [searchByTitle, setSearchByTitle] = useState("");
    const [searchByTags, setSearchByTags] = useState([]);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [confirmToDelete, setConfirmToDelete] = useState(false);
    const [articleIdToDelete,setArticleIdToDelete] = useState("");
    const [snackBar,setSnackBar] = useState(null);

    useEffect(() => {
        if(searchByTags.length!=0 && listArticles){
            let tempArticles = listArticles.filter(article=>{
                const articleTags = article.tags;
                // for each tag entered by the user search if it is persent in article tags
                for(var i=0; i<searchByTags.length; i++){
                    const tagFound=articleTags.find(tag=>{
                        return tag.toLowerCase()==searchByTags[i].toLowerCase()
                    })
                    if(tagFound)
                        return true;
                }
            })
            setlistArticles(tempArticles)
        }
        else setlistArticles(originalArticles);
    }, [searchByTags])
    // search by  title when input changes
    useEffect(() => {
        let tempArticles;
        if(searchByTitle && listArticles) {
            tempArticles = originalArticles.filter(article=>{
                return article.title.toLowerCase().indexOf(searchByTitle.toLowerCase())!=-1;
            })
            setlistArticles(tempArticles)
        }
        else setlistArticles(originalArticles) 
        // setlistArticles(originalArticles)  
        // if we don't do this then after user finishes his/her rendering 
        // and input will be empty then nothing will be show on the screen
    }, [searchByTitle])

    useEffect(() => {
        if(id){
            try{
                const curDevArticles = JSON.parse(sessionStorage.curDevArticles);
                setlistArticles(curDevArticles);
                setOriginalArticles(curDevArticles);
            }catch(e){
                console.log(e)
                axios.get(`/api/articles/get-articles?id=${id}`)
                .then(res=>{
                    setlistArticles(res.data);
                    setOriginalArticles(res.data);

                    // save curDevArticles in session storage
                    try{
                        sessionStorage.curDevArticles = JSON.stringify(res.data);
                    }catch(e){
                        console.log("While saving curDevArticles in session storage ",e);
                    }
                }).catch(err=>{
                    console.log(err)
                    setErr(true);
                })
            }
        }
    }, [id])

    {/* if confirmToDelete is true then delete the article with articleIdToDelete */}
    useEffect(()=>{
        if(confirmToDelete){
            setOpenConfirmationDialog(false)
            axios.post(`/api/articles/delete?id=${articleIdToDelete}`)
            .then(res=>{
                let tempArticles = originalArticles;
                tempArticles = originalArticles.filter(article=>{
                    return article._id != articleIdToDelete;
                })
                setOriginalArticles(tempArticles);
                setlistArticles(tempArticles);
                setConfirmToDelete(false);
            }).catch(err=>{
                console.log(err)
                setConfirmToDelete(false);
                setSnackBar(<SnackBar message="Try again." severity="error"  setSnackBar={setSnackBar} />)
            })
        }
    },[confirmToDelete])

    const deleteArticle=(articleId,title)=>{
        setOpenConfirmationDialog(true)
        setArticleIdToDelete(articleId)
    }
    let articles=null;

    // reverse the array
    if(listArticles)
     articles = listArticles.reverse().map(article=>{
         console.log(article.title,"-------------")
        return <Card key={article._id} className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {article.title}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {article.description}
                        </Typography>
                        <div style={{marginTop:"5px"}}></div>
                        
                        <CardActions className={classes.actions}>
                            {/* remove unwanted things form the url */}
                            <Link  href={`/articles/${article.title.split(" ").join("-").split("?").join("").split("/").join("").split("#").join("")} ${article._id}`}>
                                <a style={{textDecoration:"underline white"}}>Get <span style={{color:"red"}}>this</span></a>
                            </Link>
                        </CardActions>
                        <ReactTagInput
                            tags={article.tags} 
                            maxTags={5}
                            editable={false}
                            removeOnBackspace={true}
                            readOnly={true}
                        />
                    </CardContent>
                    <IconButton onClick={(e)=>deleteArticle(article._id,article.title)} aria-label="delete" className={classes.deleteButton} >
                        <DeleteIcon />
                    </IconButton>

                    <IconButton onClick={(e)=>router.push(`/articles/edit?id=${article._id}`)} className={classes.editButton} aria-label="edit">
                        <EditIcon/>
                    </IconButton>
                </Card>
    })

    if(err) return <h1>Oh! Did't get it for you.</h1>
    // it is required to  iterate for the 5 time to create 5 Skeleton
    var skeleton = [1,2,3,4,5]
    if(!listArticles)  
        return <Container disableGutters maxWidth="sm">
        {skeleton.map(sk=>{
            return <div key={sk}><Skeleton variant="text" component="h1"/>
            <div style={{marginBottom:"10px"}}></div>
    
            <Skeleton variant="text" component="p"/>
            <div style={{marginBottom:"5px"}}></div>
    
            <Skeleton variant="text" component="p"/>
            <div style={{marginBottom:"5px"}}></div>
    
            <Skeleton variant="text" component="div" height="50px"/>
            <div style={{marginBottom:"10px"}}></div></div>
        })}
    </Container>

    return <>
        <Head>
            <title>Articles for dev's by dev's | B-Dev-G</title>
        </Head>
        <CssBaseline />

        {/* a dialog will pops up and ask to confirm before deleting  the article... */}
        <Container disableGutters maxWidth="sm">
            <ConfirmDialog
                title="Are you sure."
                open={openConfirmationDialog}
                onClose={setOpenConfirmationDialog}
                confirm={setConfirmToDelete}
            />
            {snackBar}
            <Grid spacing={2} container alignContent="space-between">
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                        id="saerch by title"
                        fullWidth
                        label="Search by title"
                        name="search"
                        placeholder="search by title"
                        size="small"
                        variant="outlined"
                        onChange={(e)=>setSearchByTitle(e.target.value)}
                    />
                </Grid>
                
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <ReactTagInput 
                        tags={searchByTags} 
                        maxTags={5}
                        editable={true}
                        removeOnBackspace={true}
                        placeholder="Search by tags"
                        onChange={(newTags)=>setSearchByTags(newTags)}
                    />
                </Grid>
            </Grid>

            <div style={{marginTop:"10px"}}></div>
            {articles}
            {articles.length==0?<NotFound/>:""}
        </Container>
    </>
}

export default Articles

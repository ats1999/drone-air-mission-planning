import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';

import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme)=>({
    root:{
        display:"flex",
        justifyContent:"space-evenly",
        marginLeft:"10px",
        marginRight:"10px"
    },
    thumbsUpButton:{
        color:"#021cd5",
        fontSize:"15px"
    },
    thumbsDownButton:{
        color:"#ed0000",
        fontSize:"15px"
    },
    viewsIcon:{
        color:"black",
        fontSize:"15px"
    },
    dateIcon:{
        color:"blue",
        fontSize:"15px"
    }
}))
function ArticleInfo() {    
    const classes =  useStyles();
    return <Card>
        <CardActions>
            <ButtonGroup  size="small">
                <div className={classes.root}>
                    <IconButton className={classes.thumbsUpButton}>
                        <ThumbUpIcon/> 12
                    </IconButton>

                    <IconButton className={classes.thumbsDownButton}>
                        <ThumbDownIcon/> 15
                    </IconButton>

                    <IconButton className={classes.viewsIcon}>
                        <VisibilityIcon/> 200
                    </IconButton>

                    <IconButton className={classes.dateIcon}>
                        <AccessTimeIcon/> 12-10-2020
                    </IconButton>
                </div>
            </ButtonGroup>
        </CardActions>
    </Card>
}

export default ArticleInfo

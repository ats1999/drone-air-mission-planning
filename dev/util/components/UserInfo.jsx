import React from 'react'
import PropTypes from "prop-types";
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import Popover from '@material-ui/core/Popover';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// ICONS
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LanguageIcon from '@material-ui/icons/Language';
import GitHubIcon from '@material-ui/icons/GitHub';
import rahulValidate from "rahul-validate";
import Container from '@material-ui/core/Container';
const useStyles = makeStyles({
    root: {
      minWidth: 150,
      boxShadow:"0px 0px 10px 0px #8f9fa4",
      marginTop:"20px",
      borderRadius:"10px"
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    avatarContainer:{
        display:"flex"
    },
    userAvatar:{
        color:"white",
        backgroundColor:"red",
        height:"30px",
        width:"30px"
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
    popover: {
        pointerEvents: 'none'
    },
    paper: {
        padding: "10px"
    },
    avtarContainer:{
        padding:"0px",
        margin:"0px"
    },
    avtarText:{
        marginLeft:"4px"
    },
    status:{
        color:"#795548",
        fontWeight:"bold"
    },
    container:{
        maxWidth:"100%",
        marginTop:"15px"
    }
  });

function UserInfo({authorInfo}) {
    const classes = useStyles();
    const {fname, lname, socialMedia, pic, bio,status,_id} = JSON.parse(authorInfo);
  
    return <Container className={classes.container} maxWidth="md">
                <div style={{
                    display:"flex"
                }}>
                    <Avatar className={!rahulValidate.isUrl(pic)?classes.userAvatar:''} alt={fname} src={pic} />
                    <div style={{
                        marginLeft:"10px"
                    }}>
                        <Typography className={classes.title} component="span" color="secondary" gutterBottom>
                            {fname+" "+lname}
                        </Typography> <br/>

                        <Typography className={classes.status} component="span" color="textPrimary" gutterBottom>
                            {status}
                        </Typography>
                    </div>

                    {/* <Typography className={classes.title} gutterBottom>
                        {bio}
                    </Typography> */}
                </div>
                <CardActions>
                        {rahulValidate.isUrl(socialMedia.github)?
                            <a target="_blank" href={socialMedia.github}><GitHubIcon className={classes.githubIcon}/></a> :null  
                        }

                        {rahulValidate.isUrl(socialMedia.twitter)?
                            <a target="_blank" href={socialMedia.twitter}><TwitterIcon className={classes.twitterIcon}/></a> :null  
                        }

                        {rahulValidate.isUrl(socialMedia.linkedin)?
                            <a target="_blank" href={socialMedia.linkedin}><LinkedInIcon className={classes.linkedinIcon}/></a> :null  
                        }

                        {rahulValidate.isUrl(socialMedia.website)?
                            <a target="_blank" href={socialMedia.website}><LanguageIcon/></a> :null  
                        }
                </CardActions>
            </Container>  
}
UserInfo.propTypes = {
    authorInfo:PropTypes.string.isRequired
}
export default UserInfo;

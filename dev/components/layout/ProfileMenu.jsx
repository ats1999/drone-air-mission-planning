import React,{useState,useEffect} from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Link from "next/link";

const useStyles = makeStyles({
    whiteColor:{
        color:"white"
    }
})
function ProfileMenu({avtarClass}) {
    const classes = useStyles();
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(()=>{
        try{
            let user = JSON.parse(localStorage.dev);
            setUser({name:user.fname,pic:user.pic,id:user.id})
        }catch(e){
          console.log(e);
        }
    },[]);
    if(!user) return null;
    return <>
        <IconButton onClick={handleClick} className={avtarClass} aria-label="user profile" aria-controls="simple-menu" aria-haspopup="true">
                <Avatar  alt={user.name} src={user.pic} />
                <ArrowDropDownIcon className={classes.whiteColor}/>
        </IconButton>

         <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <Link href={`/dev/${user.id}`}>
                <MenuItem>Profile</MenuItem>
            </Link>
            <Link href={`/dev/${user.id}?edit=true`}>
                <MenuItem>Edit</MenuItem>
            </Link>
            <Link href={`/articles/dev-articles?id=${user.id}`}>
                <MenuItem>Articles</MenuItem>
            </Link>
            <MenuItem onClick={(e)=>{
                setUser(null);
                try{
                    localStorage.removeItem("dev");
                }catch(e){
                    console.log(e);
                }
            }}>Logout</MenuItem>
    </Menu>
    </>
}

export default ProfileMenu

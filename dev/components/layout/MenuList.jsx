import {useState} from "react";
import Link from "next/link";
import TreeMenu from "./TreeMenu";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// MUI Icons
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';
import ExploreIcon from '@material-ui/icons/Explore';
import CreateIcon from '@material-ui/icons/Create';
import LayersIcon from '@material-ui/icons/Layers';
import HomeIcon from '@material-ui/icons/Home';
import ListItem from "@material-ui/core/ListItem";
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  userProfileIcon:{
    color:"black",
    backgroundColor:"transparent"
  }
});

let menuListItem = [{
    to:"/",
    text:"B-Dev-G",
    icon:<HomeIcon color="error"/>
  },
    {
    to:"/articles",
    text:"View article",
    icon:<ExploreIcon color="primary"/>
  },{
    to:"/auth",
    text:"SignIn",
    icon:<PersonAddIcon color="primary"/>
  },
  // {
  //   to:"/auth/login",
  //   text:"Email-SignIn",
  //   icon:<LockIcon color="primary"/>
  // },
  {
    to:"/articles/write",
    text:"Write an article for dev's",
    icon:<CreateIcon color="primary"/>
}];

menuListItem = menuListItem.map((item,index)=>{ // component={Link}
return <ListItem key={index} button>
  <Link href={item.to}>
    <ListItemIcon>{item.icon}</ListItemIcon>
  </Link>
  <Link href={item.to}>
      <ListItemText>{item.text}</ListItemText>
  </Link>
</ListItem>
});

export default function MenuList(){
    const classes = useStyles();
    return <>
        {menuListItem}
        <ListItem>
            <TreeMenu/>
        </ListItem>
    </>
}
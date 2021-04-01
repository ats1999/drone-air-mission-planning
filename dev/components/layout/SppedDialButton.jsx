import React,{useState,useEffect} from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Snackbar from '@material-ui/core/Snackbar';
// MUI Icons
import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';
import ExploreIcon from '@material-ui/icons/Explore';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
  root: {
    height:"auto",
    transform: 'translateZ(0px)',
    flexGrow: 1,
    position: 'fixed',
    bottom:"10px",
    right:"10px",
    zIndex:"1100"
  },
  speedDial: {

  },
}));



export default function OpenIconSpeedDial() {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [devId, setDevId] = useState(null);
  const [showSnackBar, setShowSnackBar] = useState({msg:"",disp:false});
  useEffect(()=>{
    try{
      const dev = JSON.parse(localStorage.dev);
      setDevId(dev.id)
    }catch(e){
      console.log(e)
    }
  },[]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let actionList = [{
    to:"/",
    name:"B-Dev-G",
    text:"B-Dev-G",
    icon:<HomeIcon color="error"/>
  },
    {
    to:"/articles",
    name:"articles",
    text:"View articles",
    icon:<ExploreIcon color="primary"/>
  },{
    to:"/auth/signup",
    name:"signup",
    text:"Join Us",
    icon:<PersonAddIcon color="primary"/>
  },{
    to:"/auth/login",
    name:"signin",
    text:"SignIn",
    icon:<LockIcon color="primary" />
  },{
    to:"/articles/write",
    name:"write",
    text:"Write an article for dev's",
    icon:<CreateIcon color="primary"/>
  }]
  
  actionList = actionList.map((action,index)=>{
    if(action.name == 'signin' && devId) return false;

    return <SpeedDialAction 
        key={action.name}
        icon={<Link href={action.to}>{action.icon}</Link>}
        tooltipTitle={action.text}
        // onClick={(e)=>router.push(action.to)}
      />
  })

  return (
    <div className={classes.root}> 
      <Snackbar
        anchorOrigin={{ vertical:"bottom",horizontal:"right" }}
        open={showSnackBar.disp}
        onClose={()=>setShowSnackBar({disp:false,msg:""})}
        message={showSnackBar.msg}
      />
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        FabProps={{
          size:"small"
        }}
      >
        {actionList}
      </SpeedDial>
    </div>
  );
}


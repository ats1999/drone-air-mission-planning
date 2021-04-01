import React from 'react';
import {useRouter} from "next/router";
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import LayersIcon from '@material-ui/icons/Layers';
import WorkIcon from '@material-ui/icons/Work';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';
const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
    height:"auto"
  },
  menuItemIcon:{
    marginBottom:"-3px",
    fontSize:"20px",
    marginRight:"5px"
  }
});

export default function TreeMenu() {
  const classes = useStyles();
  const router = useRouter();
  const handleLinkOpen=(link)=>{
    router.push(link)
  }
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon className={classes.closeIcon} />}
      defaultExpandIcon={<ChevronRightIcon color="primary" />}
    >
      <TreeItem nodeId="1" label={<div><LayersIcon className={classes.menuItemIcon} color="primary" /> {"Explore Me"}</div>}>
        <TreeItem nodeId="2" label={<div><AssignmentIcon className={classes.menuItemIcon} color="primary"/> {"Articles"}</div>}>
          <TreeItem onLabelClick={()=>handleLinkOpen("/articles/write")}  nodeId="3" label={<div><CreateIcon color="primary"/> {"Write"}</div>} />
          <TreeItem onLabelClick={()=>handleLinkOpen("/articles")}nodeId="4" label={<div><VisibilityIcon className={classes.menuItemIcon} color="primary"/> {"View Articles"}</div>} />
        </TreeItem>

        <TreeItem onLabelClick={()=>handleLinkOpen("/jobs")} nodeId="5" label={<div><WorkIcon className={classes.menuItemIcon} color="primary"/> {"Jobs"}</div>} />
      </TreeItem>
    </TreeView>
  );
}

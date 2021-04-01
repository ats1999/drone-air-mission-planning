import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
function ConfirmDialog({open,onClose,title,confirm,text}) {
    return <Dialog
            open={open}
            onClose={()=>onClose(false)}
            aria-labelledby={title}
            >
                <h2 style={{color:"red",margin:'auto'}}>{title}</h2>
            {/* <DialogTitle color="error" id="responsive-dialog-title"><p className="text-danger">{title}</p></DialogTitle> */}
            <DialogContent>
            <DialogContentText>
               Once you deleted this article, this can not be retrived. 
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={()=>onClose(false)} color="secondary">
                Disagree
            </Button>
            <Button onClick={()=>confirm(true)} color="primary" autoFocus>
                Agree
            </Button>
            </DialogActions>
        </Dialog>
}

ConfirmDialog.propTypes={
    open:PropTypes.bool.isRequired,
    onClose:PropTypes.func.isRequired,
    title:PropTypes.string.isRequired,
    confirm:PropTypes.string.isRequired,
    text:PropTypes.string
}
export default ConfirmDialog

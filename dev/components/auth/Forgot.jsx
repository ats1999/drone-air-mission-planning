import React,{useState,useEffect} from 'react';
import {useRouter} from "next/router";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import EnhancedEncryptionOutlinedIcon from '@material-ui/icons/EnhancedEncryptionOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {updatePageViews} from "@utils/js/pageViews";
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Forgot() {
  const classes = useStyles();
  const router  = useRouter();
  const [buttonVariant, setButtonVariant] = useState("outlined");
  useEffect(()=>{
    updatePageViews(router.asPath)
  },[])
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EnhancedEncryptionOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            onMouseEnter={(e)=>setButtonVariant("contained")}
            onMouseLeave={(e)=>setButtonVariant("outlined")}
            type="submit"
            fullWidth
            variant={buttonVariant}
            color="primary"
            className={classes.submit}
          >
            Forgot
          </Button>
        </form>
      </div>
    </Container>
  );
}

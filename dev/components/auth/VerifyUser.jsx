import React,{useState} from 'react';
import Link from "next/link";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';;
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useRouter} from 'next/router';
import axios from "axios";
import SnackBar from "@utils/components/SnackBar";
import rahulValidate from "rahul-validate";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function VerifyUser() {
  const classes = useStyles();
  const router = useRouter();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState(null);

  const submit =(e) =>{
    e.preventDefault();
    if(!email || !password){
      setSnackbar(<SnackBar severity="warning" message="Enter values" setSnackbar={setSnackbar}/>);
      return;
    }

    if(!rahulValidate.isEmail(email)){
      setSnackbar(<SnackBar severity="warning" message="Provide a valid email address." setSnackbar={setSnackbar}/>);
      return;
    }

    if(!rahulValidate.isStrongPassword(password)){
      setSnackbar(<SnackBar severity="warning" message="Please provide a strong password" setSnackbar={setSnackbar}/>);
      return;
    }
    
    axios.post("/api/auth/verify-user",{
      ts:router.query.ts,
      email:email,
      password
    })
    .then(res=>{
      if(res.status == 200){
        try{
          localStorage.dev=res.data;
        }catch(e){
          console.log(e)
        }
        
        router.push("/")
      }
    })
    .catch(err=>{
      console.log(err);
        setSnackbar(<SnackBar 
                          severity="error" 
                          message={err.response.data} 
                          setSnackbar={setSnackbar}
                    />);
    })
  }
  return (
    <Container component="main" maxWidth="xs">
      {snackbar}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Verify
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
            onChange={(e)=>setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e)=>setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={submit}
            className={classes.submit}
          >
            Verify
          </Button>
        </form>
      </div>
    </Container>
  );
}

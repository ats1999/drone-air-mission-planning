import React,{useState,useEffect} from 'react';
import Link from "next/link";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useRouter} from "next/router";
import SnackBar from "@utils/components/SnackBar";
import rahulValidate from "rahul-validate";
import {updatePageViews} from "@utils/js/pageViews";
import axios from "axios";
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

export default function SignIn() {
  const classes = useStyles();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackBar, setSnackBar] = useState(null);
  const [buttonVariant, setButtonVariant] = useState("outlined");
  useEffect(()=>{
      updatePageViews(router.asPath)
  },[])
  const signIn=(e)=>{
    e.preventDefault();

    if(!email||!password){
      setSnackBar(<SnackBar severity="warning" message="Provide inputs..." setSnackBar={setSnackBar}/>);
      return;
    }

    if(!rahulValidate.isEmail(email)){
      setSnackBar(<SnackBar severity="warning" message="Incorrect email..." setSnackBar={setSnackBar}/>);
      return;
    }
    if(!rahulValidate.isStrongPassword(password)){
      setSnackBar(<SnackBar severity="warning" message="Provide a  strong password..." setSnackBar={setSnackBar}/>);
      return;
    }

    axios.post("/api/auth/login",{
      email:email,
      password:password
    }).then(res=>{
      if(res.status==200)
        try{
          localStorage.dev = JSON.stringify(res.data)
        }catch(e){
          console.log(e)
        }
      if(res.status==200)
          router.back();
    }).catch(err=>{
      console.log(err);
      setSnackBar(<SnackBar severity="error" message={err.response.data} setSnackBar={setSnackBar}/>);
    })
  }
  return (
    <Container component="main" maxWidth="xs">
      {snackBar}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
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
            autoComplete="current-password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            onMouseEnter={(e)=>setButtonVariant("contained")}
            onMouseLeave={(e)=>setButtonVariant("outlined")}
            type="submit"
            fullWidth
            variant={buttonVariant}
            color="primary"
            className={classes.submit}
            onClick={signIn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/auth/forgot" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/auth/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

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
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {updatePageViews} from "@utils/js/pageViews";

// custome imports
import EmailLoading from "@utils/components/EmailLoading";
import rahulValidate from "rahul-validate";
import SnackBar from "@utils/components/SnackBar";
import axios from "axios";
import {useRouter} from "next/router";
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const router = useRouter();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [snackBar, setSnackBar] = useState(null);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [buttonVariant, setButtonVariant] = useState("outlined");
  useEffect(()=>{
    updatePageViews(router.asPath)
  },[])
  const submitSignUp = (e) =>{
    e.preventDefault();
    
    // check for empty fields
    if(!fname||!lname||!email||!password){
      setSnackBar(<SnackBar setSnackBar={setSnackBar} severity="error" message="Provide the inputs."/>);
      return;
    }

    // check if fname and lname is correct
    if(!rahulValidate.isText(fname) || !rahulValidate.isText(lname)){
      setSnackBar(<SnackBar setSnackBar={setSnackBar} severity="error" message="First name and last name should be only text."/>);
      return;
    }

    // check if email is valid
    if(!rahulValidate.isEmail(email)){
      setSnackBar(<SnackBar setSnackBar={setSnackBar} severity="error" message="Please provide a valid email"/>);
      return;
    }

    // check for password
    if(!rahulValidate.isStrongPassword(password)){
      setSnackBar(<SnackBar setSnackBar={setSnackBar} severity="error" message="Please provide a strong password."/>);
      setPasswordHelperText("Password must contain a lower case letter,a upper case latter, a number, a symbol and length should be in between 8-16...")
      return;
    }
    
    axios.post("/api/auth/signup",{
      fname:fname,
      lname:lname,
      email:email,
      password:password
    }).then(res=>{   
      if(res.status==200)
        try{
          localStorage.dev=JSON.stringify(res.data)
        }catch(e){
          console.log(e);
        }
      if(res.status == 200)
          setIsSubmitted(true);
        
      else setSnackBar(<SnackBar setSnackBar={setSnackBar} severity="error" message="User already exists!"/>);
    }).catch(err=>{
      console.log("error===>>",err);
      setSnackBar(<SnackBar setSnackBar={setSnackBar} severity="error" message={err.response.data}/>);
    })
  }
  
  if(isSubmitted)
    return <EmailLoading/>
    
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {snackBar}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e)=>setFname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e)=>setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={passwordHelperText}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
            <div>
                <span style={{color:"gray"}}>You must agree this</span> <Link href="/pages/terms-and-conditions">
                  <a>T & C</a>
                </Link>,
                <Link href="/pages/privacy-policy">
                  <a>Privacy policy</a>
                </Link>
                &nbsp;
                and 
                &nbsp; 
                <Link href="/pages/cookie">
                  <a>Cookie policy</a>
                </Link>
            </div>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Don't Remember me."
                onChange={(e)=>setRemember(!remember)}
              />
            </Grid>
          </Grid>
          <Button
            onMouseEnter={(e)=>setButtonVariant("contained")}
            onMouseLeave={(e)=>setButtonVariant("outlined")}
            type="submit"
            fullWidth
            variant={buttonVariant}
            color="primary"
            className={classes.submit}
            onClick={submitSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/auth/login" variant="body2">
                <a>Already have an account? Sign in</a>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
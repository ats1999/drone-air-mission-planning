import React,{useState,useEffect} from 'react';
import {useRouter} from "next/router";
import { TextField,Grid } from '@material-ui/core';
import rahulValidate from "rahul-validate";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { DropzoneDialog } from 'material-ui-dropzone';
import SnackBar from "@utils/components/SnackBar";
import uploadImageCloud from "@utils/uploadImage";
import axios from "axios";
import {updatePageViews} from "@utils/js/pageViews";

const useStyles = makeStyles((theme) => ({
    inputMargin:{
        marginTop:"10px"
    },
    photoCameraIcon:{
        marginLeft:"5px",
        marginRight:"10px"
    }
}));

export default function Edit({id}) {
  const classes = useStyles();
  const router = useRouter();
  const [userId, setUserId] = useState(id);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [pic, setPic] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [open, setOpen] = React.useState(false);
  const [snackBar, setSnackBar] = useState(null);
  useEffect(()=>{
      updatePageViews("/dev?edit=true")
  },[])
  {/* upload image to the cloudnary */}
  const uploadImage = (files) =>{
        uploadImageCloud(files).then(url=>{
            setPic(url)
        }).catch(err=>{
            setSnackBar(<SnackBar severity="error" message="Try again" setSnackBar={setSnackBar}/>)
        }).finally(()=>{
            setOpen(false);  
        })
  }

  useEffect(() => {
      // userId might be not available initially
      if(userId){
        try{
            const editDev = JSON.parse(sessionStorage.editDev);
            setFname(editDev.fname);
            setLname(editDev.lname);
            setPic(editDev.pic);
            setBio(editDev.bio);
            setStatus(editDev.status);
            setGithubUrl(editDev.socialMedia.github);
            setLinkedinUrl(editDev.socialMedia.linkedin);
            setTwitterUrl(editDev.socialMedia.twitter);
            setWebsiteUrl(editDev.socialMedia.website);
        }catch(e){
            console.log(e);
            axios.get(`/api/dev/edit?id=${userId}`)
            .then(res=>{
                    const user = res.data;
                    setFname(user.fname);
                    setLname(user.lname);
                    setPic(user.pic);
                    setBio(user.bio);
                    setStatus(user.status);
                    setGithubUrl(user.socialMedia.github);
                    setLinkedinUrl(user.socialMedia.linkedin);
                    setTwitterUrl(user.socialMedia.twitter);
                    setWebsiteUrl(user.socialMedia.website);

                    // save editDev in sessionStorage
                    try{
                        sessionStorage.editDev = JSON.stringify(res.data);
                    }catch(e){
                        console.log("while saving editDev in session storage ",e);
                    }
            }).catch(err=>{
                    console.log(err)
            })
        }
    }
  }, [userId])

  const handleSubmit=(e)=>{
      e.preventDefault();
      axios.post(`/api/dev/edit?edited=true&id=${userId}`,{
        fname,lname,pic,bio,status,
        socialMedia:{
            github:githubUrl,website:websiteUrl,
            linkedin:linkedinUrl,twitter:twitterUrl
        },
      }).then(res=>{
          router.push(`/dev/${userId}`)
      }).catch(err=>{   
        console.log(err)
      })
  }
  return  <Grid className="page__padding" container spacing={3}>
            {snackBar}
            <Grid item xs={12} sm={12} md={6} lg={6} >
                <h3>Personal information</h3>
                    <TextField
                        autoFocus
                        variant="outlined"
                        label="First Name"
                        placeholder="First name"
                        size="small"
                        fullWidth
                        margin="normal"
                        name="fname"
                        id="fname"
                        type="text"
                        value={fname}
                        onChange={(e)=>setFname(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        label="Last Name"
                        placeholder="Last name"
                        size="small"
                        fullWidth
                        margin="normal"
                        name="lname"
                        id="lname"
                        type="text"
                        value={lname}
                        onChange={(e)=>setLname(e.target.value)}
                    />
                    
                    <TextField
                        variant="outlined"
                        label="Status"
                        placeholder="Status"
                        size="small"
                        fullWidth
                        margin="normal"
                        name="status"
                        id="status"
                        type="text"
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        label="Bio"
                        placeholder="Bio"
                        size="small"
                        fullWidth
                        margin="normal"
                        name="bio"
                        id="bio"
                        type="text"
                        value={bio}
                        onChange={(e)=>setBio(e.target.value)}
                    />
                    
                    {/* file upload component */}
                    <DropzoneDialog
                        acceptedFiles={['image/*']}
                        cancelButtonText={"cancel"}
                        submitButtonText={"submit"}
                        maxFileSize={5000000}
                        open={open}
                        onClose={() => setOpen(false)}
                        onSave={(files) => uploadImage(files)}
                        showPreviews={true}
                        showFileNamesInPreview={true}
                    />
                    <Button 
                        variant="outlined" 
                        size="small"
                        color="primary" 
                        fullWidth
                        onClick={() => setOpen(true)}
                    >
                        <PhotoCamera className={classes.photoCameraIcon}/>
                        Profile picture
                    </Button>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} >
                <h3>Social profiles</h3>
                <TextField
                    variant="outlined"
                    label="Github url"
                    placeholder="Github url"
                    size="small"
                    fullWidth
                    margin="normal"
                    name="gitub-url"
                    id="gitub-url"
                    type="url"
                    value={githubUrl}
                    error={githubUrl&&!rahulValidate.isUrl(githubUrl)}
                    helperText={githubUrl&&!rahulValidate.isUrl(githubUrl)?"Please enter a valid url":""}
                    onChange={(e)=>setGithubUrl(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="Linkedin url"
                    placeholder="Linkedin url"
                    size="small"
                    fullWidth
                    margin="normal"
                    name="Linkedin-url"
                    id="Linkedin-url"
                    type="url"
                    value={linkedinUrl}
                    error={linkedinUrl&&!rahulValidate.isUrl(linkedinUrl)}
                    helperText={linkedinUrl&&!rahulValidate.isUrl(linkedinUrl)?"Please enter a valid url":""}
                    onChange={(e)=>setLinkedinUrl(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="Twitter url"
                    placeholder="Twitter url"
                    size="small"
                    fullWidth
                    margin="normal"
                    name="Twitter-url"
                    id="Twitter-url"
                    type="url"
                    value={twitterUrl}
                    error={twitterUrl&&!rahulValidate.isUrl(twitterUrl)}
                    helperText={twitterUrl&&!rahulValidate.isUrl(twitterUrl)?"Please enter a valid url":""}
                    onChange={(e)=>setTwitterUrl(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="Website url"
                    placeholder="Website url"
                    size="small"
                    fullWidth
                    margin="normal"
                    name="Website-url"
                    id="Website-url"
                    type="url"
                    value={websiteUrl}
                    error={websiteUrl&&!rahulValidate.isUrl(websiteUrl)}
                    helperText={websiteUrl&&!rahulValidate.isUrl(websiteUrl)?"Please enter a valid url":""}
                    onChange={(e)=>setWebsiteUrl(e.target.value)}
                />
                <Button onClick={handleSubmit} color="primary" variant="contained" size="small" >Submit</Button>
            </Grid>
  </Grid>

}

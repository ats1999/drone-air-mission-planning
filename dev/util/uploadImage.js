import axios from "axios";
async function uploadImage(files){
    return new Promise((resolve,reject)=>{
        const formData = new FormData();
        formData.append("file",files||files[0]);
        formData.append("upload_preset", "bdevg_rahul"); 
        formData.append("api_key", "485514153841195");
        axios.post("https://api.cloudinary.com/v1_1/bdevg/image/upload",formData)
        .then(response=>{
            console.log(response.data.secure_url)
            resolve(response.data.secure_url)
        }).catch(err=>{
            console.log("Upload's error-->",err);
            reject("Can't upload")
        })
    })
}
export default uploadImage
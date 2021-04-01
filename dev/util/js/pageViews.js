import axios from "axios";
export const updatePageViews = (pageUrl) =>{
    axios.get(`${process.env.NEXT_PUBLIC_META_BASE_API}/page/${pageUrl.split("/").join("_").split("?").join(">")}`)
    .then(res=>{
        return res.data.views
    }).catch(err=>{
        console.log("While updating page views",err);
    })
}

export const getPageVews = () =>{

}
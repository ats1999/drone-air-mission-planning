import {useRouter} from "next/router";
import {useEffect} from "react";
import {updatePageViews} from "@utils/js/pageViews";
import Typography from "@material-ui/core/Typography";

export default function AboutUs(){
    const router = useRouter();
    useEffect(()=>{
        updatePageViews(router.asPath)
    },[])
    return <div>
        <Typography align="center" component="h1" variant="h4">
            Welcome to <span style={{color:"green"}}>www.bdevg.com</span>
        </Typography>
    </div>
}
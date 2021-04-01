import Head from "next/head";
import {useEffect} from "react";
import {useRouter} from "next/router";
import GitHubIcon from '@material-ui/icons/GitHub';
const GI = process.env.NEXT_PUBLIC_GITHUB_ID;
const RURI = process.env.NEXT_PUBLIC_REDIRECT_URI;

import styles from "./styles/style.module.css";
export default function Auth(){
    const router = useRouter();
    useEffect(()=>{
        try{
            console.log(sessionStorage.justLogged)
            if(sessionStorage.justLogged) {
                sessionStorage.removeItem("justLogged")
                router.back();
            } 
        }catch(e){
            console.log(e);
        };
    },[])
    return <>
        <Head>
            <title>B-Dev-G | Authentication Oauth</title>
        </Head>

        <div className={styles.btn_container}>
            <a href={`https://github.com/login/oauth/authorize?scope=user&client_id=${GI}&redirect_uri=${RURI}&allow_signup=true`} className={styles.btn_link} >
                <GitHubIcon/> <span className={styles.linkText}>Join using Github</span>
            </a>
        </div>
    </>
}
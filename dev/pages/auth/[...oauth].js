import { useRouter } from 'next/router'
import {useEffect,useState} from "react";
import axios from "axios";

import styles from "./styles/style.module.css";

export default function oAuth(){
    const router = useRouter();
    const [status, setStatus] = useState("init")
    useEffect(()=>{
        if(router.query.code){
            axios.post(`/api/auth/github/${router.query.code}`)
            .then(res=>{
                try{
                    localStorage.dev = JSON.stringify(res.data);
                    sessionStorage.justLogged = true;
                }catch(e){
                    console.log(e);
                }
                console.log(res.data)
                router.back();
            }).catch(err=>{
                console.log(err)
                setStatus("Try again...")
            });
        }
    },[router]);

    return <div className={styles.loading_container}>
        <img className={styles.loading_icon} src="/images/layout/ring-loading.svg" alt=""/>
        <p className={styles.loading_text}>{status}</p>
    </div>
}
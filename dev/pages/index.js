import {useRouter} from "next/router";
import {useEffect} from "react";
import {updatePageViews} from "@utils/js/pageViews";
import dynamic from "next/dynamic";
import Head from "next/head";
const Header = dynamic(()=>import("../components/layout/Header"));
export default function Index(){
  const router = useRouter();
  useEffect(()=>{
      updatePageViews(router.pathname)
  },[]);
  
  return <>
    <Head>
      <title>B-Dev-G | By Dev for Dev | IN | Bharitya binary Developer Group</title>
    </Head>
    <Header/>
  </>
}


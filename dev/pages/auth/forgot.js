import Head from "next/head";
import dynamic from "next/dynamic";
const ForgotComp = dynamic(()=>import("@components/auth/Forgot"));
export default function Forgot(){
    return <>
            <Head>
                <title>Forgot | B-Dev-G</title>
                <meta name="description" content="Join www.bdevg.com It would be great for us to listen in another way. We always wants you to here everything from world."></meta>
            </Head>
            <ForgotComp/>
        </>
}

import dynamic from "next/dynamic";
import Head from "next/head";
const SignIn = dynamic(()=>import("@components/auth/SignIn"));

export default function Login(){
    return <>
            <Head>
                <title>Login | B-Dev-G</title>
                <meta name="description" content="Join www.bdevg.com It would be great for us to listen in another way. We always wants you to here everything from world."></meta>
            </Head>
            <SignIn/>
        </>
}
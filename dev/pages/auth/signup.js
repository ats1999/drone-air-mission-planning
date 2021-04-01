import dynamic from "next/dynamic";
import Head from "next/head";
const SignUpComp = dynamic(()=>import("@components/auth/SignUp"));
export default function SignUp(){
    return <>
            <Head>
                <title>SignUp | B-Dev-G</title>
                <meta name="description" content="Join www.bdevg.com It would be great for us to listen in another way. We always wants you to here everything from world."></meta>
            </Head>
            <SignUpComp/>
        </>
}

import {useRouter} from "next/router";
import dynamic from "next/dynamic";
const EditProfile = dynamic(()=>import("@components/dev/Edit"));
const DevProfile = dynamic(()=>import("@components/dev/Dev"));

export default function Dev(){
    const router = useRouter();
    if(router.query.edit)
        return <EditProfile id={router.query.id}/>
    return <DevProfile id={router.query.id}/>
}
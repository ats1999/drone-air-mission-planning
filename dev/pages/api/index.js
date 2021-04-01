import JobsHandler from "@handlers/jobs/jobs"
const indexGen = async (req,res) =>{
    console.log(req.query.createJob)
    switch(req.query.space){
        case 'jobs':
            if(req.query.createJob==1)
                try{
                    const jobId = await JobsHandler.createJob(req.body.data);
                    return res.status(200).send(jobId);
                }catch(e){
                    console.log(e);
                    return res.status(500).send("Internal server error.")
                }
            if(req.query.getJob==1)
                try{
                    const jobs = await JobsHandler.getJob();
                    return res.status(200).send(jobs);
                }catch(e){
                    console.log(e);
                    return res.status(500).send("Internal server error.")
                }
            break;
        default : return res.status(422).send("A bad request...@index")
    }
}


export default indexGen;
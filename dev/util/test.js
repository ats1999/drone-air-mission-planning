async function test(){
    return new Promise((resolve,reject)=>{
        console.log("Resolving")
        if(true) return resolve("making fun")
        console.log("Resolved")
        return reject("")
        console.log("reject")
    })
}
async function testRes(){
    try{
        const result = await test()
        console.log("Test--",result)
    }catch(e){
        console.log("error",e)
    }
}
testRes()
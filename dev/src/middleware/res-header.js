const resHeader = (handler) => (req,res)=>{
    console.log("Header set...")
    res.setHeader('Content-Type', 'application/json')
    return handler(req, res)
}

module.exports = resHeader;
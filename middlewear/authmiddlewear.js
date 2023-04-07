const jwt = require("jsonwebtoken")






const auth_middlewear = async(req,res ,next)=>{
    let token
    try {
        
        if(req?.headers?.authorization?.startsWith("Bearer")){
            token =req?.headers?.authorization?.split(" ")[1]
            const decoded_token = jwt.verify(token, "SandeepIsTheKey");
        
            console.log(decoded_token);
        
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

module.exports = {auth_middlewear}
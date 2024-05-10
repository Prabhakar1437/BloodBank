const jwt = require("jsonwebtoken");

// decode token

module.exports = function(req,res,next){
    try {
        const token = req.header("authorization").replace("Bearer ","");
        const decoded= jwt.verify(token, process.env.TOKEN_SECRET);
        req.body.userId= decoded.userId;
        next();
    } catch (error) {
        return res.send({
            message: error.message,
            success: false,
        });
    }
}
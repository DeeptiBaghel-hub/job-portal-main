import jwt from "jsonwebtoken";
const isAuthenticated= async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false
            })
        }
        const decode=await jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        }

        req.id=decode.userId;
        next();

    } catch(error){
        console.log(error);
        // jwt.verify throws (not returns null) on an invalid/expired/malformed
        // token, so it lands here. Without this response the request used to
        // hang forever instead of failing cleanly.
        return res.status(401).json({
            message:"Invalid or expired token",
            success:false
        });
    }
}

export default isAuthenticated;

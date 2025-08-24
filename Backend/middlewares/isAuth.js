// import jwt from 'jsonwebtoken';
// const isAuth=async(req,res,next)=>{
//     try {
//         const token=req.cookies.token;
//         console.log("Cookies received:", req.cookies);
//         if(!token){
//             return res.status(400).json({message:"Token not found, please login again!"});
//         }
//         const verifyToken=await jwt.verify(token,process.env.JWT_SECRET);
//         console.log("✅ Decoded Token:", verifyToken);
//         req.userId=verifyToken.id;
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({message:`Auth error ${error}`});
//     }
// }

// export default isAuth;

import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
    try {
        console.log("=== isAuth middleware called ===");
        console.log("Cookies received:", req.cookies);

        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            console.log("❌ No token found!");
            return res.status(401).json({ message: "Token not found, please login again!" });
        }

        let verifyToken;
        try {
            verifyToken = jwt.verify(token, process.env.JWT_SECRET);
            console.log("✅ Token successfully verified:", verifyToken);
        } catch (err) {
            console.log("❌ Token verification failed:", err.message);
            return res.status(401).json({ message: "Invalid or expired token!" });
        }

        // Attach userId to request
        req.userId = verifyToken.userId;
        console.log("User ID set in req.userId:", req.userId);

        next();
    } catch (error) {
        console.error("🔥 isAuth middleware error:", error);
        return res.status(500).json({ message: `Auth error: ${error.message}` });
    }
};

export default isAuth;

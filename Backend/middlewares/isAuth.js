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
        const token = req.cookies.token;
        console.log("Cookies received:", req.cookies);

        if (!token) {
            return res.status(400).json({ message: "Token not found, please login again!" });
        }

        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", verifyToken);

        // Use userId, not id
        req.userId = verifyToken.userId;

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Auth error ${error}` });
    }
};

export default isAuth;

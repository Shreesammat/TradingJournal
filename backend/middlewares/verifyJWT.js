import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    console.log("🔹 Verifying JWT token...");
    const token = req.cookies?.token;

    if(!token) {
        console.log("🔴 No token found in cookies. Unauthorized access attempt.");
        return res.status(401).json({success: false,message: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("✅ Token verified. User:", decoded.id || decoded.email || decoded);
        next();
    } catch (error){
        console.log("🔴 Invalid or expired token:", error.message);
        return res.status(403).json({success:false, message: 'Invalid or expired token'});
    }
};

export default verifyJWT;
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorhandler.js";
import User from "../models/userModel.js";


const isUserAuthentic =  async (req, res, next) => {
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to complete this request", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET );

    req.user = await User.findById(decodedData.id);

    next();
};


//check admin access
const authorizeRoles = (...roles)=>{
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            new ErrorHandler(
                `Role: ${req.user.role} is not alloweed to access this resource`,
                403
            );
        }

        next();
    }
};

export { isUserAuthentic, authorizeRoles };
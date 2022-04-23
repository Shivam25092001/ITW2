import User from "../models/userModel.js";
import sendToken from "../utils/jwtcreater.js";
import ErrorHandler from "../utils/errorhandler.js";
 
//Register new user
const registerUser = async (req, res, next)=>{
    const { name, rollno, password } = req.body;
    console.log(req.body);
    const user = await User.create({
        name : name, 
        rollno : rollno,
        email : rollno+"@iiitn.ac.in", 
        password : password,
    });

    sendToken(user, 201, res);
}


//Login User
const Login = async (req, res, next)=>{
    const {email, password} = req.body;

    //Checking if user has provided complete credentials
    if(! (email || password)){
        return next(new ErrorHandler("Please enter email & password", 400));
    }

    //Verifying email & password
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Email ID or Password incorrect", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){

        return next(new ErrorHandler("Email ID or Password incorrect", 401));
    }

    sendToken(user, 200, res);
}


//Logout User
const Logout = async (req, res, next) => {

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "Logged Out successfully!"
    });
} ;

export {Login, registerUser, Logout} ;
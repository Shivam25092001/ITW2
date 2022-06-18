import User from "../models/userModel.js";
import sendToken from "../utils/jwtcreater.js";
import ErrorHandler from "../utils/errorhandler.js";
import sendMail from '../utils/sendMail.js'
import csv from "csvtojson";
//const csvFilePath='../Testcsv.csv';
import path, {dirname} from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 
//Register new user
const registerUser = async (req, res, next)=>{
    const { name, rollno, password, course, mobile, address, role } = req.body;
    console.log(req.body);

    const user = await User.create({
        name : name, 
        rollno : rollno,
        email : rollno+"@iiitn.ac.in", 
        password : password,
        course : course,
        mobile : mobile,
        address : address,
        role : role
    });

    res.status(200).json({
        success: true,
        user
    });
}

//register user from csv
const registerFromCSV = async (req, res, next) => {
    try {
        if(req.file == undefined){
            return res.status(400).send("Please upload an excel file");
        }
        let csvFilePath = `D:/Web_projects/ITW2/server/public/assets/uploads/`+ req.file.filename;
    
        // Async / await usage
        const userList = await csv().fromFile(csvFilePath);
        console.log(userList);

        userList.forEach( async (user) => {

            const newUser = await User.create({
                name : user.name, 
                rollno : user.rollno,
                email : user.rollno+"@iiitn.ac.in", 
                password : user.password,
                course : user.course,
                mobile : user.mobile,
                address : user.address,
                role : user.role
            });

        } );
        res.status(200).json({
            success: true,
            userList
        });
    }
    catch(error){
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};


//Login User
const Login = async (req, res, next)=>{
    const {email, password} = req.body;

    console.log(req.body);
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
};


// Forgot Password
const forgotpass = async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }

    //Get Password reset token
    const resetToken = user.getResetPassToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- 
    \n\n ${resetPasswordUrl}
    \n If not requested for this mail, please ignore.`;

    try {
        await sendMail({
            email: user.email,
            subject: `Padosi ID Password Recovery`,
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500));
    }
};


//Reset Password
const resetpass = async(req, res, next) => {

    //hashing resetToken & comparing 
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken : resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has expired.", 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password & Confirm Password didn't match.", 400));
    }

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();

    sendToken(user, 200, res);
};

//Get user details
const getUserDetails = async (req, res, next) => {

    const user = await User.findById(req.user.id);
  
    if(!user){
      return next(new ErrorHandler("User not found", 404));
    }
  
    return res.status(200).json({
      success: true,
      user
    })
};


//update user password
const updatePassword = async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){

        return next(new ErrorHandler("Old Password incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){

        return next(new ErrorHandler("New Password & Confirm Password didn't match.", 400));
    }

    user.password = req.body.newPassword;
    await user.save();
  
    sendToken(user, 200, res);
};


//update user profile
const updateProfile = async (req, res, next) => {
    
    const newUserData = {
        name : req.body.name,
        rollno : req.body.rollno,
        email : req.body.rollno+"@iiitn.ac.in", 
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
    });
};


//Get all users 
const getUsers = async(req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });
};


//Get single User 
const getSingleUser = async(req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("User does not exist", 404));
    }

    res.status(200).json({
        success: true,
        user
    });
};

//Delete user
const deleteUser = async (req, res, next) => {
    

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User doesnot exist with id : ${req.params.id}`, 404));
    }

    await user.remove();

    res.status(200).json({
        success: true,
    });
};


//update user role (admin)
const updateRole = async (req, res, next) => {
    
    const newUserData = {
        email : req.body.email,
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
    });
};

const findStudents = async (req, res) =>{
    const users = await User.find({});

    const reqUsers = [];

    users.forEach(user=>{
        if(user.role === 'student'){
            reqUsers.push(user);
        }
    })

    res.status(200).json({
        success: true,
        reqUsers
    })
}

const findTeachers = async (req, res) =>{
    const users = await User.find({});

    const reqUsers = [];

    users.forEach(user=>{
        if(user.role === 'teacher'){
            reqUsers.push(user);
        }
    })

    res.status(200).json({
        success: true,
        reqUsers
    })
}


const findAdmins = async (req, res) =>{
    const users = await User.find({});

    const reqUsers = [];

    users.forEach(user=>{
        if(user.role === 'admin'){
            reqUsers.push(user);
        }
    })

    res.status(200).json({
        success: true,
        reqUsers
    })
}


const findECEStudents = async (req, res) =>{
    const users = await User.find({});

    const reqUsers = [];

    users.forEach(user=>{
        if(user.course === 'ECE' && user.role === 'student'){
            reqUsers.push(user);
        }
    })

    res.status(200).json({
        success: true,
        reqUsers
    })
}


const findCSEStudents = async (req, res) =>{
    const users = await User.find({});

    const reqUsers = [];

    users.forEach(user=>{
        if(user.course === 'CSE' && user.role === 'student'){
            reqUsers.push(user);
        }
    })

    res.status(200).json({
        success: true,
        reqUsers
    })
}


const findCSETeachers = async (req, res) =>{
    const users = await User.find({});

    const reqUsers = [];

    users.forEach(user=>{
        if(user.course === 'CSE' && user.role === 'teacher'){
            reqUsers.push(user);
        }
    })

    res.status(200).json({
        success: true,
        reqUsers
    })
}


const findECETeachers = async (req, res) =>{
    const users = await User.find({});

    const reqUsers = [];

    users.forEach(user=>{
        if(user.course === 'ECE' && user.role === 'teacher'){
            reqUsers.push(user);
        }
    })

    res.status(200).json({
        success: true,
        reqUsers
    })
}


export {Login, registerUser, Logout, getUserDetails, forgotpass,
    resetpass, updatePassword, updateProfile, getUsers,
    getSingleUser, deleteUser, registerFromCSV, updateRole,
    findStudents, findTeachers, findAdmins,
    findCSEStudents, findECEStudents, findCSETeachers, findECETeachers
} ;
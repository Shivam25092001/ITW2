import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true, "Please enter your name"],
        maxlength: [40, "Name should not eceed more than 40 charecters"],
        minlength: [4, "Name should be atleast 4 charecters long"]
    },
    rollno : {
        type: String,
        required : [true, "Please enter enrollment number"],
    },
    email:{
        type: String,
        required: [true, "Please enter your email ID"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address" ]
    },
    password: {
        type: String,
        required: [true, "Please Enter your password"],
        minlength: [8, "Password cannot be smaller than 8 charecetrs"],
        select: false,
    },
    role: {
        type: String,
        default: "student"
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});


//Encrypting the password before it gets saved to the db
userSchema.pre("save", async function(next){
    //in case of no password change 
    // to prevent password re-hashing
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});



//JWT token
userSchema.methods.getJWT = function(){
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
    );
}

//Password Check
userSchema.methods.comparePassword = async function(inputPassword){
    
    return await bcrypt.compare(inputPassword, this.password);
}


//Generating Password reset token
userSchema.methods.getResetPassToken = function(){

    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing & adding resetToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken;
};


export default mongoose.model('User', userSchema);
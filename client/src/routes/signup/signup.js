import React, { useState } from "react";
import "./signup.css";
import axios from "axios";





const Signup = () => {
  const [fullname,setFullname]=useState('')
  const [enrollment,setEnrollment]=useState('')
  const [role,setRole]=useState('')
  const [course,setCourse]=useState('')
  const [address,setAddress]=useState('')
  const [mobile,setMobile]=useState('')
  const [password,setPassword]=useState('')
  const [confirmpassword,setConfirmpassword]=useState('')

  const sendData = async ()=>{
    var obj = {name:fullname,rollno:enrollment,password,course,mobile,address,role };
    console.log(obj);
    var response = await axios.post("/register", obj);
  }

const verifyPassword=()=>{
  if(password===confirmpassword){
    return true;
  }else{
    return false;
  }
}

  return (
    <div className="container">
      <div className="form-box">
        <div className="header-form">
          <h1 className="text-primary text-center">Register here</h1>
        </div>
        <div className="body-form">
          <form
            action=""
            method="post"
            id="register-form"
            onSubmit={(e) => {
              console.log(e);
              e.preventDefault();
            }}
          >
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Name" onChange={(e)=>{setFullname(e.target.value)}}/>
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enrollment code" onChange={(e)=>{setEnrollment(e.target.value)}}
              />
            </div>
            <div className="input-group mb-3">
              <label for="student">Role: </label>
              <div>
                <input type="radio" name="role" id="student" onChange={(e)=>{console.log(e.target.id);
                  setRole(e.target.id)}}/>
                <label for="student">Student</label>
              </div>
              <div>
                <input type="radio" name="role" id="teacher"  onChange={(e)=>{setRole(e.target.id)}}/>
                <label for="teacher">Teacher</label>
              </div>
            </div>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Course" onChange={(e)=>{setCourse(e.target.value)}}/>
            </div>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}}/>
            </div>
            <div className="input-group mb-3">
              <input type="number" className="form-control" placeholder="Mobile No." onChange={(e)=>{setMobile(e.target.value)}}/>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"  onChange={(e)=>{setConfirmpassword(e.target.value)}}
              />
            </div>
            <button type="button" className="btn btn-secondary btn-block" onClick={()=>{
              if(verifyPassword()){
                sendData();
              }else{
                window.alert('Password not matched')
              }

            }}>
              SIGN UP
            </button>

            <div className="login-link">
              <a href="/login">Already have an account? Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

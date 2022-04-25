import React, { useState } from "react";
import "./signup.css";

const signup = () => {
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
              <input type="text" className="form-control" placeholder="Name" />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enrollment code"
              />
            </div>
            <div className="input-group mb-3">
              <label for="student">Role: </label>
              <div>
                <input type="radio" name="role" id="student" />
                <label for="student">Student</label>
              </div>
              <div>
                <input type="radio" name="role" id="teacher" />
                <label for="teacher">Teacher</label>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
              />
            </div>
            <button type="button" className="btn btn-secondary btn-block">
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

export default signup;

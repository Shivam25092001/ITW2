import React from "react";
import { Link } from "react-router-dom";

const home = () => {
  return (
    <div>
      {" "}
      <Link to="/login">Login</Link>
      <Link to="/register">Signup</Link>
    </div>
  );
};

export default home;

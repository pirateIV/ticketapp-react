import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>Landing Page</h1>

      <Link to="/auth/login">Login</Link>
      <Link to="/auth/signup">Signup</Link>
    </div>
  );
}

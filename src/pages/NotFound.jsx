import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      Invalid Route. Go to <Link to="/">Home</Link>
    </div>
  );
}

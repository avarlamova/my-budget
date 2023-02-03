import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

import React from "react";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);

  const welcomeMessage = user ? `Welcome, ${user}!` : "Welcome";

  const content = (
    <section className="welcome">
      <h1>{welcomeMessage}</h1>
      <p>
        <Link to="/dashboard">Go to dashboard</Link>
      </p>
    </section>
  );
  return content;
};

export default Welcome;

import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom";

import React from "react";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcomeMessage = user ? `Welcome, ${user}!` : "Welcome";
  const tokenAbbreviation = token ? `${token.slice(0, 9)}...` : "";

  const content = (
    <section className="welcome">
      <h1>{welcomeMessage}</h1>
      <p>Token: {tokenAbbreviation} </p>
      <p>
        {" "}
        <Link to="/userslist">Go to the Users List</Link>
      </p>
    </section>
  );
  return content;
};

export default Welcome;
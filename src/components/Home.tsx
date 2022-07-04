import { Link } from "react-router-dom";
import * as React from "react"; //https://github.com/microsoft/TypeScript/issues/14118

const Home = () => {
  const pageContent = (
    <div>
      <h1>Let's get started!</h1>
      <Link to="/login">Log in</Link>
    </div>
  );
  return pageContent;
};

export default Home;

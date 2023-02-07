import { Link } from "react-router-dom";
import * as React from "react"; //https://github.com/microsoft/TypeScript/issues/14118
import styles from "./Home.module.scss";

const Home = () => {
  const pageContent = (
    <div className={styles.container}>
      <h1>Let's get started!</h1>
      <Link to="/login">Log in</Link>
      <Link to="/register">Register</Link>
    </div>
  );
  return pageContent;
};

export default Home;

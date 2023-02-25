// import { Link } from "react-router-dom";
import Link from "next/link";

import * as React from "react"; //https://github.com/microsoft/TypeScript/issues/14118
import styles from "../styles/Home.module.scss";

const Home = () => {
  const pageContent = (
    <div className={styles.container}>
      <h1>Let's get started!</h1>
      <Link href="/login">
        <button className={styles.button}>Log in </button>
      </Link>
      <Link href="/register">
        <button className={styles.button}>Register </button>
      </Link>
    </div>
  );
  return pageContent;
};

export default Home;

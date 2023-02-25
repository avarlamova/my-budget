import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
// import { Link } from "react-router-dom";
import Link from "next/link";

import styles from "./Welcome.module.scss";
import React from "react";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);

  const welcomeMessage = user ? `Welcome, ${user}!` : "Welcome";

  const content = (
    <section className={styles.container}>
      <h1>{welcomeMessage}</h1>
      <Link href="/dashboard" className={styles.link}>
        Go to dashboard
      </Link>
    </section>
  );
  return content;
};

export default Welcome;

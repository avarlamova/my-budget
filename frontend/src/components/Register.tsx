import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { ReactComponent as ShowIcon } from "../assets/icons/show.svg";

import styles from "./Register.module.scss";

const USERNAME_REGEX = /^(?=.*[A-Za-z0-9]).{3,30}$/;

const Register = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  // const isUsernameValid = useUsernameValidation(user)
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); //https://reactrouter.com/docs/en/v6/hooks/use-navigate

  const dispatch = useDispatch();

  useEffect(() => {
    if (userRef && userRef.current) {
      userRef!.current.focus();
    }
  }, []); // no dependencies => when component loads

  useEffect(() => {
    const validationResult = USERNAME_REGEX.test(user);
    setValidUsername(validationResult);
  }, [user]); // validate username every time it changes

  useEffect(() => {
    setErrorMessage("");
  }, [user, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // no form reloading on submit
    if (validUsername) {
      try {
        dispatch(setCredentials({ user, password }));
        setUser("");
        setPassword("");
        // if login is successful
        navigate("/welcome");
      } catch (err: any) {
        console.log(err);
        if (!err?.originalStatus) {
          setErrorMessage("No server response");
        } else if (err.originalStatus === 400) {
          setErrorMessage("Missing username or password");
        } else if (err.originalStatus === 401) {
          setErrorMessage("Unauthorized");
        } else {
          setErrorMessage("Login failed");
        }
        if (errorRef && errorRef.current) {
          //https://stackoverflow.com/questions/40349987/how-to-suppress-error-ts2533-object-is-possibly-null-or-undefined
          errorRef.current.focus();
        }
      }
    }
  };

  const handleUserInput = (e: { target: HTMLInputElement }) =>
    setUser(e?.target.value);

  const handlePasswordInput = (e: { target: HTMLInputElement }) => {
    setPassword(e?.target.value);
  };

  //   return isLoading ? ( // comes from useLoginMutation
  //     <h1>Loading...</h1>
  //   ) : (
  return (
    <section className={styles.container}>
      <h1>Sign up</h1>

      <p
        ref={errorRef}
        className={errorMessage ? "err-message" : "offscreen"}
        aria-live="assertive"
      >
        {errorMessage}
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <input
            type="text"
            ref={userRef}
            value={user}
            onChange={handleUserInput}
            autoComplete="off"
            required
            placeholder="Username"
          />
        </div>

        <div className={styles.field}>
          <input
            type="password"
            id="password"
            onChange={handlePasswordInput}
            value={password}
            required
            placeholder="Password"
          />
          <ShowIcon className={styles.showIcon} />
        </div>
        <button className={styles.signUpBtn}>Sign Up</button>
      </form>
    </section>
  );
};
export default Register;

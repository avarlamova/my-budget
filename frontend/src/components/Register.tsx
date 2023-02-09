import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ReactComponent as ShowIcon } from "../assets/icons/show.svg";

import styles from "./Register.module.scss";
import { useRegisterMutation } from "../features/register/registerApiSlice";

const USERNAME_REGEX = /^[A-Za-z][A-Za-z0-9_]{3,29}$/;
// A valid username should start with an alphabet so, [A-Za-z].
// All other characters can be alphabets, numbers or an underscore so, [A-Za-z0-9_].
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const Register = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [password, setPassword] = useState("");
  //toggle password visibility
  const [passwordType, setPasswordType] = useState("password");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [repeatedPasswordErrorMessage, setRepeatedPasswordErrorMessage] =
    useState("");
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const navigate = useNavigate(); //https://reactrouter.com/docs/en/v6/hooks/use-navigate

  const dispatch = useDispatch();

  useEffect(() => {
    if (userRef && userRef.current) {
      userRef!.current.focus();
    }
  }, []); // no dependencies => when component loads

  useEffect(() => {
    if (user.length > 0) {
      const validationResult = USERNAME_REGEX.test(user);
      setValidUsername(validationResult);
      if (!validUsername && user.length > 0) {
        setLoginErrorMessage("Invalid login");
      }
      // else {
      //   setLoginErrorMessage("");
      // }
    } else {
      setValidUsername(true);
      setLoginErrorMessage("");
    }
  }, [user, user.length]); // validate username every time it changes

  useEffect(() => {
    if (password.length > 0) {
      const validationResult = PWD_REGEX.test(password);
      setValidPassword(validationResult);

      if (!validPassword) {
        setPasswordErrorMessage("Invalid password");
      }
      // else {
      //   setPasswordErrorMessage("");
      // }
    } else {
      setValidPassword(true);
      setPasswordErrorMessage("");
    }
  }, [password, password.length]); // validate password

  useEffect(() => {
    if (repeatedPassword.length > 0 && password.length > 0) {
      if (repeatedPassword !== password) {
        setRepeatedPasswordErrorMessage("Passwords do not match!");
      } else {
        setRepeatedPasswordErrorMessage("");
      }
    }
  }, [repeatedPassword, password]);
  //compare password and repeated password

  const [newUser] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // no form reloading on submit
    if (validUsername) {
      try {
        await newUser({ user, password }).unwrap();
        navigate("/welcome");
      } catch (err: any) {
        console.log(err);
        if (!err?.originalStatus) {
          setServerErrorMessage("No server response");
        } else if (err.originalStatus === 400) {
          setServerErrorMessage("Missing username or password");
        } else if (err.originalStatus === 401) {
          setServerErrorMessage("Unauthorized");
        } else {
          setServerErrorMessage("Login failed");
        }
        if (errorRef && errorRef.current) {
          //https://stackoverflow.com/questions/40349987/how-to-suppress-error-ts2533-object-is-possibly-null-or-undefined
          errorRef.current.focus();
        }
      }
    }
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser(e?.target.value);

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e?.target.value);
  };

  const handleRepeatedPasswordInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatedPassword(e?.target.value);
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  //   return isLoading ? ( // comes from useLoginMutation
  //     <h1>Loading...</h1>
  //   ) : (
  return (
    <section className={styles.container}>
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
        <div className={styles.field}>
          <input
            type="text"
            ref={userRef}
            value={user}
            onInput={handleUserInput}
            autoComplete="disabled"
            required
            placeholder="username"
          />
          {/* TODO validate in checklist manner */}
          <p className={styles.rules}>
            Minimum 3 characters, starts with a letter, numbers and underscores
            are allowed
          </p>
          {!validUsername && (
            <p
              // ref={loginErrorRef}
              className={styles.errorMsg}
              aria-live="assertive"
            >
              {loginErrorMessage}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <input
            type={passwordType}
            onInput={handlePasswordInput}
            value={password}
            autoComplete="disabled"
            required
            placeholder="password"
          />
          <ShowIcon onClick={togglePassword} className={styles.showIcon} />
          <p className={styles.rules}>
            Minimum eight characters, at least one letter and one number
          </p>
          {!validPassword && (
            <p
              // ref={passwordErrorRef}
              className={styles.errorMsg}
              aria-live="assertive"
            >
              {passwordErrorMessage}
            </p>
          )}
        </div>
        <div className={styles.field}>
          <input
            type={passwordType}
            onInput={handleRepeatedPasswordInput}
            required
            autoComplete="disabled"
            placeholder="repeat password"
          />
          {repeatedPasswordErrorMessage && (
            <p ref={errorRef} className={styles.errorMsg} aria-live="assertive">
              {repeatedPasswordErrorMessage}
            </p>
          )}
        </div>

        <button
          className={styles.signUpBtn}
          disabled={
            validUsername && validPassword && !serverErrorMessage
              ? // && repeatedPasswordErrorMessage === ""
                false
              : true
          }
        >
          Sign Up
        </button>
        {serverErrorMessage && (
          <p className={styles.errorMsg} aria-live="assertive">
            {serverErrorMessage}
          </p>
        )}
      </form>
    </section>
  );
};
export default Register;

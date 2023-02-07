import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { ReactComponent as ShowIcon } from "../assets/icons/show.svg";

import styles from "./Register.module.scss";

const USERNAME_REGEX = /^[A-Za-z][A-Za-z0-9_]{3,29}$/;
// A valid username should start with an alphabet so, [A-Za-z].
// All other characters can be alphabets, numbers or an underscore so, [A-Za-z0-9_].
// Since length constraint was given as 8-30 and we had already fixed the first character, so we give {7,29}.
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
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState(
    "Minimum 3 characters, starts with a letter, numbers and underscores are allowrd"
  );
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(
    "Minimum eight characters, at least one letter and one number"
  );

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
    const validationResult = PWD_REGEX.test(password);
    setValidPassword(validationResult);
  }, [password]); // validate password

  useEffect(() => {
    if (!validUsername) {
      setLoginErrorMessage("Invalid login");
    } else {
      setLoginErrorMessage("");
    }
  }, [validUsername]);

  useEffect(() => {
    if (!validPassword) {
      setPasswordErrorMessage("Invalid password");
    } else {
      setPasswordErrorMessage("");
    }
  }, [validPassword]);

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
          setGeneralErrorMessage("No server response");
        } else if (err.originalStatus === 400) {
          setGeneralErrorMessage("Missing username or password");
        } else if (err.originalStatus === 401) {
          setGeneralErrorMessage("Unauthorized");
        } else {
          setGeneralErrorMessage("Login failed");
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
            onChange={handleUserInput}
            autoComplete="off"
            required
            placeholder="username"
          />

          <p
            // ref={loginErrorRef}
            className={styles.errorMsg}
            aria-live="assertive"
          >
            {loginErrorMessage}
          </p>
        </div>

        <div className={styles.field}>
          <input
            type={passwordType}
            onChange={handlePasswordInput}
            value={password}
            required
            placeholder="password"
          />
          <ShowIcon onClick={togglePassword} className={styles.showIcon} />
          <p
            // ref={passwordErrorRef}
            className={styles.errorMsg}
            aria-live="assertive"
          >
            {passwordErrorMessage}
          </p>
        </div>
        <div className={styles.field}>
          <input
            type={passwordType}
            onChange={handlePasswordInput}
            value={password}
            required
            placeholder="repeat password"
          />
        </div>
        <p ref={errorRef} className={styles.errorMsg} aria-live="assertive">
          {generalErrorMessage}
        </p>
        <button
          className={styles.signUpBtn}
          disabled={validUsername ? false : true}
        >
          Sign Up
        </button>
      </form>
    </section>
  );
};
export default Register;

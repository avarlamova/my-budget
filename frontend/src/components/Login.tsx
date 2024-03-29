import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import {
  useLoginMutation,
  useRefreshMutation,
} from "../features/auth/authApiSlice";
import { ReactComponent as ShowIcon } from "../assets/icons/show.svg";
import styles from "./Login.module.scss";
import useLocalStorage from "../hooks/useLocalStorage";

const USERNAME_REGEX = /^[A-Za-z][A-Za-z0-9_]{3,29}$/;

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const [passwordType, setPasswordType] = useState<string>("password");

  const [user, setUser] = useState<string>("");
  const [validUsername, setValidUsername] = useState<boolean>(false);
  // const isUsernameValid = useUsernameValidation(user)
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [persistedLogin, setPersistedLogin] = useLocalStorage(
    "rememberMe",
    "false"
  );
  const navigate = useNavigate(); //https://reactrouter.com/docs/en/v6/hooks/use-navigate

  const [login, { isLoading }] = useLoginMutation();
  const [refresh] = useRefreshMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userRef && userRef.current) {
      userRef!.current.focus();
    }

    const verifyRefreshToken = async () => {
      console.log("verifying refresh token");
      try {
        //const response =
        const res = await refresh("test");
        console.log(res);
        //const { accessToken } = response.data
        // setTrueSuccess(true)
      } catch (err) {
        console.error(err);
      }
    };
    // if (persistedLogin)
    verifyRefreshToken();
  }, []); // no dependencies => when component loads

  useEffect(() => {
    const validationResult = USERNAME_REGEX.test(user);
    setValidUsername(validationResult);
    if (!validUsername) {
      setErrorMessage("Invalid login");
    }
  }, [user]); // validate username every time it changes

  useEffect(() => {
    setErrorMessage("");
  }, [user, password]);

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const handleUserInput = (e: { target: HTMLInputElement }) =>
    setUser(e?.target.value);

  const handlePasswordInput = (e: { target: HTMLInputElement }) => {
    setPassword(e?.target.value);
  };

  // const handleRememberMe = () => {
  //   setRememberMe(!rememberMe);
  // };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // no form reloading on submit
    if (validUsername) {
      try {
        const userData = await login({ user, password }).unwrap();
        dispatch(setCredentials({ ...userData, user }));
        // setPersistedLogin(rememberMe.toString());
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

  return isLoading ? ( // comes from useLoginMutation
    <section className={styles.container}>
      <h1>Loading...</h1>
    </section>
  ) : (
    <section className={styles.container}>
      <p ref={errorRef} className={styles.errorMessage} aria-live="assertive">
        {errorMessage}
      </p>

      <h1>User Login</h1>

      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <div className={styles.field}>
          <input
            type="text"
            ref={userRef}
            value={user}
            onChange={handleUserInput}
            required
            placeholder="Username"
          />
        </div>
        <div className={styles.field}>
          <input
            type={passwordType}
            id="password"
            onChange={handlePasswordInput}
            value={password}
            required
            placeholder="Password"
          />
          <ShowIcon onClick={togglePassword} className={styles.showIcon} />
        </div>
        {/* <div className={styles.rememberMe}>
          Remember me {rememberMe}
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMe}
          />
        </div> */}
        <button
          className={styles.button}
          disabled={validUsername && password.length > 0 ? false : true}
        >
          Sign In
        </button>
      </form>
      <div className={styles.signUpContainer}>
        No account yet?{" "}
        <Link className={styles.link} to="/register">
          Sign up
        </Link>
      </div>
    </section>
  );
};
export default Login;

import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const USERNAME_REGEX = /^(?=.*[A-Za-z0-9]).{3,30}$/;

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  // const isUsernameValid = useUsernameValidation(user)
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); //https://reactrouter.com/docs/en/v6/hooks/use-navigate

  const [login, { isLoading }] = useLoginMutation();
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
    try {
      const userData = await login({ user, password }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
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
  };

  const handleUserInput = (e: { target: HTMLInputElement }) =>
    setUser(e?.target.value);

  const handlePasswordInput = (e: { target: HTMLInputElement }) => {
    setPassword(e?.target.value);
  };

  return isLoading ? ( // comes from useLoginMutation
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <p
        ref={errorRef}
        className={errorMessage ? "err-message" : "offscreen"}
        aria-live="assertive"
      >
        {errorMessage}
      </p>

      <h1>User Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <FontAwesomeIcon icon={solid("user-secret")} />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            value={user}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={handlePasswordInput}
            value={password}
            required
          />
          <button>Sign In</button>
        </div>
      </form>
    </section>
  );
};
export default Login;

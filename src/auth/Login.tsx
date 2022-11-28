import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
  const userRef = React.useRef<HTMLInputElement>(null);
  const errorRef = React.useRef<HTMLDivElement>(null);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); //https://reactrouter.com/docs/en/v6/hooks/use-navigate

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userRef && userRef.current) {
      userRef!.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [user, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await login({ user, password }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPassword("");
      navigate("/welcome");
    } catch (err: any) {
      if (!err?.originalStatus) {
        setErrorMessage("Сервер не отвечает");
      } else if (err.originalStatus === 400) {
        setErrorMessage("Неверный логин или пароль");
      } else if (err.originalStatus === 401) {
        setErrorMessage("Unauthorized");
      } else {
        setErrorMessage("Login Failed");
      }
      if (errorRef && errorRef.current) {
        //https://stackoverflow.com/questions/40349987/how-to-suppress-error-ts2533-object-is-possibly-null-or-undefined
        errorRef.current.focus();
      }
    }
  };

  const handleUserInput = (e: { target: HTMLInputElement }) =>
    setUser(e?.target.value);

  const handlePasswordInput = (e: { target: HTMLInputElement }) =>
    setPassword(e?.target.value);

  return isLoading ? ( // comes from useLoginMutation
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <div
        ref={errorRef}
        className={errorMessage ? "err-message" : "offscreen"}
        aria-live="assertive"
      >
        {errorMessage}
      </div>

      <h1>User Login</h1>

      <form onSubmit={handleSubmit}>
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

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePasswordInput}
          value={password}
          required
        />
        <button>Sign In</button>
      </form>
    </section>
  );
};
export default Login;

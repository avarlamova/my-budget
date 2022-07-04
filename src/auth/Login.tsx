import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
  const userRef = useRef();
  const errorRef = useRef();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [navigate] = useNavigate(); //https://reactrouter.com/docs/en/v6/hooks/use-navigate

  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();

  return <div>Login</div>;
};
export default Login;

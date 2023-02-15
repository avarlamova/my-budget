import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

import React from "react";

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  console.log("token", token);
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VybmFtZSI6InRlc3QiLCJyb2xlcyI6WzIwMDVdfSwiaWF0IjoxNjc2NDgxODkwLCJleHAiOjE2Nzc3Nzc4OTB9.RGeZmp2JRpFqGFs91Tt7pdBmyoZdydX-jbAfrzGlafQ
  const location = useLocation();
  return token ? ( // if we are logged in
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      state={{ from: location }} //
      replace
    ></Navigate>
  );
};

export default RequireAuth;

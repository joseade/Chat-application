import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboardscreen() {
  const state = useSelector((state) => state);
  console.log(state);

  return (
    <div>
      <h1>Welcome</h1>
      {state.loginReducer.currentUser && (
        <h1>{state.loginReducer.currentUser.id}</h1>
      )}
    </div>
  );
}

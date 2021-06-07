import React, { useState, useEffect } from "react";
import { Button, FormFeedback } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";

export default function Loginscreen() {
  const state = useSelector((state) => state);
  const [user, setUser] = useState({
    email: "",
    password: "",
    touched: {
      email: false,
    },
  });

  const dispatch = useDispatch();

  const formValues = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (field) => (e) => {
    setUser({
      ...user,
      touched: {
        ...user.touched,
        [field]: true,
      },
    });
  };

  const validate = (email) => {
    const errors = {
      email: "",
      touched: {
        email: false,
      },
    };

    if (
      user.touched.email &&
      email.split("").filter((x) => x === "@").length !== 1
    ) {
      errors.email = "Email should contain a @";
    }

    return errors;
  };

  const register = (e) => {
    e.preventDefault();
    const data = {
      email: user.email,
      password: user.password,
    };

    dispatch(loginUser(data));
  };

  const errors = validate(user.email, user.password);

  return (
    <div>
      {state.loginReducer.succes && <Redirect to={"/dashboard"} />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-start">
          <h2 className="text-danger">{state.loginReducer.error}</h2>
          <h2 className="text-center m-2">Login</h2>
          <form onSubmit={register}>
            <input
              type="text"
              placeholder="email"
              className="form-control"
              value={user.email}
              name="email"
              required
              onChange={formValues}
              onBlur={handleBlur("email")}
            />
            <div className="text-danger">{errors.email}</div>
            <input
              type="text"
              placeholder="password"
              className="form-control"
              value={user.password}
              name="password"
              required
              onChange={formValues}
            />

            <Button className="btn mt-3">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

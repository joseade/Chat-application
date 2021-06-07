import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormFeedback } from "reactstrap";
import { Redirect } from "react-router";

import { registerUser } from "../actions/userActions";

export default function Registerscreen() {
  const state = useSelector((state) => state);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    touched: {
      name: false,
      email: false,
      password: false,
      cpassword: false,
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

  const validate = (name, email, password, cpassword) => {
    const errors = {
      name: "",
      email: "",
      password: "",
    };

    if (user.touched.name && name.length < 3) {
      errors.name = "Name should be greater than three characters";
    }
    if (user.touched.name && name.length > 10) {
      errors.name = "Name should be lower than ten characters";
    }
    if (
      user.touched.email &&
      email.split("").filter((x) => x === "@").length !== 1
    ) {
      errors.email = "Email should contain a @";
    }

    if (
      user.touched.password &&
      user.touched.cpassword &&
      password !== cpassword
    ) {
      errors.password = "You must introduce the same password";
    }

    return errors;
  };

  const register = (e) => {
    // const submit =
    //   user.touched.name &&
    //   user.touched.email &&
    //   user.touched.password &&
    //   user.touched.cpasword &&
    //   !errors.name &&
    //   !errors.email &&
    //   !errors.password;
    // if (!submit) {
    //   e.preventDefault();
    //   console.log("No se puede");
    //   return;
    // }
    e.preventDefault();
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    dispatch(registerUser(user));
  };

  const errors = validate(user.name, user.email, user.password, user.cpassword);

  return (
    <div>
      {state.registerUserReducer.succes && <Redirect to={"/login"} />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-start">
          <h2 className="text-danger">{state.registerUserReducer.error}</h2>
          <h2 className="text-center m-2">Register</h2>
          <form onSubmit={register}>
            <input
              type="text"
              placeholder="name"
              className="form-control"
              value={user.name}
              name="name"
              required
              onChange={formValues}
              onBlur={handleBlur("name")}
              valid={(errors.name === "").toString()}
              invalid={(errors.name !== "").toString()}
            />
            <div className="text-danger">{errors.name}</div>
            <input
              type="text"
              placeholder="email"
              className="form-control"
              value={user.email}
              name="email"
              required
              onChange={formValues}
              onBlur={handleBlur("email")}
              valid={(errors.email === "").toString()}
              invalid={(errors.email !== "").toString()}
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
              onBlur={handleBlur("password")}
            />
            <input
              type="text"
              placeholder="confirm password"
              className="form-control"
              value={user.cpassword}
              name="cpassword"
              required
              onChange={formValues}
              onBlur={handleBlur("cpassword")}
            />
            <div className="text-danger">{errors.password}</div>
            <Button className="btn mt-3">REGISTER</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

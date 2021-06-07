export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });

  try {
    const res = await fetch("http://localhost:3050/api/users/signup", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // body data type must match "Content-Type" header
    });
    const data = await res.json();
    console.log(data);
    if (data.error) {
      throw new Error();
    }
    dispatch({
      type: "USER_REGISTER_SUCCES",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "USER_REGISTER_FAILED",
      payload: "User already exist",
    });
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });

  try {
    const res = await fetch("http://localhost:3050/api/users/signin", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // body data type must match "Content-Type" header
    });
    const data = await res.json();
    if (data.error) {
      throw new Error();
    }
    dispatch({
      type: "USER_LOGIN_SUCCES",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "USER_LOGIN_FAILED",
      payload: "Invalid email or password",
    });
  }
};

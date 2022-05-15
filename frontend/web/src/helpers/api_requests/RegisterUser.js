import { instance } from "./axios";

export const registerUser = async (username, email, password) => {
  const data = JSON.stringify({
    username: username,
    email: email,
    password: password,
  });

  const options = {
    headers: { "content-type": "application/json" },
  };
  const res = await instance
    .post("/u", data, options)
    .catch((error) => error.request);
  if (res.status === 201) {
    return res;
  } else if (res.status === 409) {
    return "username or email taken";
  } else if (res.status === 422) {
    return "invalid input";
  } else if (res.status === 500) {
    return "something went wrong";
  }
};

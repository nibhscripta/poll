import { instance } from "./axios";

export const loginUser = async (vals) => {
  let data = new FormData();
  data.append("username", vals.username);
  data.append("password", vals.password);

  const options = {
    withCredentials: true,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    redirect: "follow",
  };
  const res = await instance.post("/login", data, options).catch((error) => {
    return error;
  });
  return res;
};

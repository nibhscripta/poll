import { instance } from "./axios";

export const registerUser = async (vals) => {
  const data = JSON.stringify(vals);

  const options = {
    headers: { "content-type": "application/json" },
  };
  const res = await instance.post("/u", data, options).catch((error) => {
    return error;
  });
  return res;
};

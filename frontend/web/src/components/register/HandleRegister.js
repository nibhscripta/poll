import { registerUser } from "../../helpers/api_requests/RegisterUser";

var entropy = require("string-entropy");

const handleRegister = async (e, setIsError, setError, navigate) => {
  e.preventDefault();

  const t = e.target;
  const username = t.username.value;
  const email = t.email.value;
  let password = t.password.value;
  let confirmPassowrd = t.confirm_password.value;

  console.log("Entropy:\t", entropy(password));

  if (password === confirmPassowrd) {
    const res = await registerUser(username, email, password);
    if (res === "username or email taken") {
      setIsError(true);
      setError("Username or email is taken.");
    } else if (res === "invalid input") {
      setIsError(true);
      setError("Invalid input");
    } else if (res === "something went wrong") {
      setIsError(true);
      setError("Something went wrong");
    } else if (res.data) {
      navigate(`/login?u=${res.data.username}`);
    }
  } else if (password !== confirmPassowrd) {
    setIsError(true);
    setError("Passwords must match.");
  }
  e.target.password.value = "";
  e.target.confirm_password.value = "";
};

export default handleRegister;

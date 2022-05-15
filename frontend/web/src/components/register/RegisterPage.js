import changeTitle from "../../helpers/dom/changeTitle";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "./RegisterPage.css";
import handleRegister from "./HandleRegister";
import RegistrationError from "./RegistrationError";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  changeTitle("Create an account");
  return (
    <div className="register-page">
      <form
        className="register-form"
        onSubmit={(e) => handleRegister(e, setIsError, setError, navigate)}
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="off"
          autoCapitalize="off"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          autoComplete="off"
          autoCapitalize="off"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          autoCapitalize="off"
        />
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm password"
          autoComplete="off"
          autoCapitalize="off"
        />
        <button type="submit">Create account</button>
        <div className="register-login-redirect">
          Have an account already? <Link to="/login">Login</Link>
        </div>
      </form>
      {isError && <RegistrationError error={error} />}
    </div>
  );
};

export default RegisterPage;

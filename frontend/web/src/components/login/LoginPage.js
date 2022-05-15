import "./LoginPage.css";
import handleLogin from "./HandleLogin";

import changeTitle from "../../helpers/dom/changeTitle";
import { useLocation, Link } from "react-router-dom";

const LoginPage = () => {
  changeTitle("Sign in");
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const defaultUsername = query.get("u");
  return (
    <div className="login-page">
      <form className="login-form" onSubmit={(e) => handleLogin(e)}>
        <input
          type="text"
          name="email"
          placeholder="Email or Username"
          autoComplete="off"
          autoCapitalize="off"
          defaultValue={defaultUsername}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          autoCapitalize="off"
        />
        <button type="submit">Login</button>
        <div className="login-register-redirect">
          Don't have an account? <Link to="/register">Create one</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

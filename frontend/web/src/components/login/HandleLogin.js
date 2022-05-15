const handleLogin = (e) => {
  e.preventDefault();
  console.log(e.target.email.value, e.target.password.value);
  e.target.password.value = "";
};

export default handleLogin;

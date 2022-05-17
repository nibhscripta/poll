import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/home/Home";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/register" exact element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

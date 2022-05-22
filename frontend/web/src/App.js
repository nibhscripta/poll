import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "./components/home/Home";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/register" exact element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

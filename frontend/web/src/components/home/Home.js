import { useState } from "react";
import LoadingPage from "../loading/LoadingPage";
import "./home.css";

const Home = () => {
  const [loading, setLoading] = useState(true);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  sleep(5000).then(() => {
    setLoading(false);
  });
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="nothing">
          <h1>Wasn't loading anything.</h1>
        </div>
      )}
    </>
  );
};

export default Home;

import "./loadingpage.css";

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingPage;

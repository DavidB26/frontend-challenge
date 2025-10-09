import Footer from "./Footer";
import Header from "./Header";
import ProgressBar from "./ProgressBar";
import { useLocation } from "react-router-dom";

const Layout = ({ children, showFooter = true, showProgress = false, currentStep = 1 }) => {
  const location = useLocation();
  const step = location.pathname.includes("/summary") ? 2 : 1;
  const isPlansOrSummary =
    location.pathname.includes("/plans") || location.pathname.includes("/summary");

  return (
    <div className="flex flex-col items-center justify-start   overflow-hidden ">
  
      <Header />
      {showProgress && <ProgressBar currentStep={step} />}
  
      <main className={`form-home ${isPlansOrSummary ? "form-home--compact" : ""} relative flex-grow flex items-center justify-center  mx-auto w-full md:w-[1360px] form-home`}>
        {children}
      </main>

     {showFooter !== false && <Footer />}
    </div>
  );
};

export default Layout;
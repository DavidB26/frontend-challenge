import Footer from "./Footer";
import Header from "./Header";
import ProgressBar from "./ProgressBar";

const Layout = ({ children, showFooter = true, showProgress = false, currentStep = 1 }) => {
  return (
    <div className="flex flex-col items-center justify-start   overflow-hidden ">
  
      <Header />
      {showProgress && <ProgressBar currentStep={1} />}
  
      <main className="relative flex-grow flex items-center justify-center  mx-auto w-full md:w-[1360px] form-home">
        {children}
      </main>

     {showFooter !== false && <Footer />}
    </div>
  );
};

export default Layout;
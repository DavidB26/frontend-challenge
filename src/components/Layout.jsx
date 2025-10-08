import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-start  bg-[rgba(248,249,255,1)] overflow-hidden ">
      {/* Header fijo arriba */}
      <Header />

      {/* Wrapper para el contenido de las páginas */}
      <main className="relative flex-grow flex items-center justify-center  mx-auto w-full md:w-[1360px] form-home">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
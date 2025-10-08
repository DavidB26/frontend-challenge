import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-start  bg-[rgba(248,249,255,1)] overflow-hidden w-full md:w-[1360px] md:h-[768px]">
      {/* Header fijo arriba */}
      <Header />

      {/* Wrapper para el contenido de las páginas */}
      <main className="relative flex-grow flex items-center justify-center  mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
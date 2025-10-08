import rimacLogo from "../assets/logo-rimac.webp";
import { FaPhoneAlt } from "react-icons/fa";


const Header = () => {
  return (
    <header className="w-full bg-transparent">
    <div className=" max-w-[1360px] flex items-center justify-between  py-4 md:py-6 px-4 md:px-0 m-auto">
          {/* Logo */}
      <div className="flex items-center">
        <img src={rimacLogo} alt="Rimac Seguros" className="h-6 md:h-8" />
      </div>

      {/* Contact info */}
      <div className="flex flex-col md:flex-row items-center text-sm md:text-base font-medium gap-2" style={{ color: "rgba(3, 5, 15, 1)" }}>
        <span className="hidden md:inline mr-2 text-xs">¡Compra por este medio!</span>
        <div className="flex items-center gap-1">
          <FaPhoneAlt className="text-lg" style={{ color: "rgba(3, 5, 15, 1)" }} />
          <span className="font-semibold text-lg">(01) 411 6001</span>
        </div>
      </div>
    </div>
    </header>
  );
};

export default Header;
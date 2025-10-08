import React from "react";
import logo from "../assets/logo-footer.webp";
const Footer = () => {
    return (


        <footer className="bg-black w-full h-[152px] md:h-[106px] py-4 md:py-6 flex md:flex-row flex-col">
            <div className="md:w-[1360px] w-full  flex items-center justify-between m-auto flex-col md:flex-row gap-6">
                <div className="flex items-center">
                    <img
                        src={logo}
                        alt="Rimac Seguros"
                        className="w-[85px] h-[42px] object-contain"
                    />
                </div>

                <p className="text-sm text-gray-300">
                    © 2025 RIMAC Seguros y Reaseguros.
                </p>
            </div>
        </footer>
    );
};

export default Footer;


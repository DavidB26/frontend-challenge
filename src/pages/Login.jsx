import { useState } from "react";
import Layout from "../components/Layout";
import { MdKeyboardArrowDown } from "react-icons/md";

const Home = () => {
    const [formData, setFormData] = useState({
        dni: "",
        celular: "",
        privacidad: false,
        comunicaciones: false,
    });

    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});

    const validateDocumento = (tipo, value) => {
        if (tipo === "DNI") return /^\d{8}$/.test(value);
        if (tipo === "CE") return /^[A-Za-z0-9]{1,9}$/.test(value);
        return /^[A-Za-z0-9]{1,10}$/.test(value); 
    };
    const validateCelular = (value) => /^\d{9}$/.test(value);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "dni") {
            const tipo = formData.tipoDocumento || "DNI";

            let regex;
            if (tipo === "DNI") regex = /^\d{0,8}$/;
            else if (tipo === "CE") regex = /^[A-Za-z0-9]{0,9}$/;
            else regex = /^[A-Za-z0-9]{0,10}$/; 

            if (!regex.test(value)) return; 
            setErrors({
                ...errors,
                dni: value === "" ? false : !validateDocumento(tipo, value),
            });
        }

        if (name === "celular") {
            if (!/^\d{0,9}$/.test(value)) return;
            setErrors({
                ...errors,
                celular: value === "" ? false : !validateCelular(value),
            });
        }

        if (name === "tipoDocumento") {
            const tipo = value;
            const dniVal = formData.dni;
            setErrors({
                ...errors,
                dni: dniVal === "" ? false : !validateDocumento(tipo, dniVal),
            });
        }

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tipo = formData.tipoDocumento || "DNI";
        const newErrors = {};
        if (!validateDocumento(tipo, formData.dni)) newErrors.dni = true;
        if (!validateCelular(formData.celular)) newErrors.celular = true;
        if (!formData.privacidad) newErrors.privacidad = true;
        if (!formData.comunicaciones) newErrors.comunicaciones = true;
        setErrors(newErrors);
        if (Object.keys(newErrors).length) {
            setError("Por favor completa todos los campos y acepta los términos.");
            return;
        }

        // Validación estricta para acceso
        if (tipo !== "DNI" || formData.dni !== "30216147" || formData.celular !== "130216147") {
            setError("El documento o celular ingresado no es válido.");
            return;
        }

        setError("");

        try {
            const res = await fetch("https://rimac-front-end-challenge.netlify.app/api/user.json");
            const data = await res.json();

            // Calcular edad a partir del birthDay del usuario
            const birthDateParts = data.birthDay.split("-");
            const birthDate = new Date(birthDateParts[2], birthDateParts[1] - 1, birthDateParts[0]);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            localStorage.setItem(
                "userData",
                JSON.stringify({
                    ...data,
                    dni: formData.dni,
                    celular: formData.celular,
                    age,
                })
            );
            window.location.href = "/planes";
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            setError("Error al conectar con el servidor.");
        }
    };

    return (
        <Layout showProgress={false}>
            <section className="relative flex flex-col items-center justify-center bg-[rgba(248,249,255,1)] px-0 py-8 md:py-0 md:flex-row md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 mx-auto">

                    <div className="w-[480px] max-h-[560px] relative z-10 mb-6 md:mb-0 md:block hidden">
                        <img
                            src="/src/assets/img-family.webp"
                            alt="familia feliz"
                            className="w-full h-full object-cover rounded-2xl md:rounded-l-3xl"
                        />
                    </div>

                    <div className="flex justify-center items-center gap-2 md:hidden w-[352px]">
                        <div className="w-[188px]">
                            <h1 className=" self-start px-3 py-1 text-xs font-semibold text-black rounded-md bg-gradient-to-r from-[#00F4E2] to-[#00FF7F] mb-2">
                                Seguro Salud Flexible
                            </h1>

                            <h2 className="text-[28px] font-bold mb-2 text-gray-800 leading-[38px] text-left">
                                Creado para ti y tu familia
                            </h2>
                        </div>
                        <div className="w-[136px] max-h-[160px]   relative z-10 mb-6 md:mb-0">
                            <img
                                src="/src/assets/img-family-xs.webp"
                                alt="familia feliz"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>


                    <div className="w-full md:w-[600px] flex flex-col justify-center py-4 md:py-10">
                        <div className="flex flex-col justify-center w-[352px] max-w-md rounded-2xl relative z-10 m-auto">
                            <h1 className="md:block hidden self-start px-3 py-1 text-base font-semibold text-black rounded-md bg-gradient-to-r from-[#00F4E2] to-[#00FF7F] mb-2">
                                Seguro Salud Flexible
                            </h1>

                            <h2 className="md:block hidden text-[32px] font-bold mb-6 text-gray-800 leading-[38px] text-left">
                                Creado para ti y tu familia
                            </h2>

                            <p className="mb-8 text-sm font-semibold text-justify" style={{ color: "rgba(3, 5, 15, 1)" }}>
                                Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.
                            </p>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="flex pb-4">
                                    <div className={`flex justify-center items-center gap-2 relative w-[140px] h-[56px] border ${errors.dni ? "border-[#ED002F]" : "border-[rgba(94,100,136,1)]"} rounded-l-md px-4 bg-transparent`}>
                                        <label
                                            htmlFor="tipoDocumento"
                                            className="relative "
                                        >
                                            <select
                                                id="tipoDocumento"
                                                name="tipoDocumento"
                                                value={formData.tipoDocumento}
                                                onChange={handleChange}
                                                className="appearance-none w-full bg-transparent focus:outline-none pr-8 cursor-pointer"
                                            >
                                                <option value="DNI">DNI</option>
                                                <option value="CE">CE</option>
                                                <option value="PAS">PAS</option>
                                            </select>
                                            <MdKeyboardArrowDown className="absolute right-4 top-1/2 -translate-y-1/2 color-[rgba(3, 5, 15, 1)] pointer-events-none" />
                                        </label>
                                    </div>
                                    <div className="relative w-2/3 ">
                                        <input
                                            type="text"
                                            name="dni"
                                            id="dni"
                                            value={formData.dni}
                                            onChange={handleChange}
                                            placeholder=" "
                                            className={`w-full h-[56px] border ${errors.dni ? "border-[#ED002F]" : "border-[rgba(94,100,136,1)]"} border-l-0 rounded-r-md px-4 py-4 focus:outline-none focus:ring-0 focus:border-[rgba(94,100,136,1)] focus:[box-shadow:unset] peer bg-transparent`}
                                        />
                                        <label
                                            htmlFor="dni"
                                            className={`pointer-events-none absolute left-4 transition-all text-sm 
    ${formData.dni
                                                    ? "top-[5px] text-xs text-[rgba(94,100,136,1)]"
                                                    : "top-1/2 -translate-y-1/2 text-base text-[rgba(3,5,15,1)]"} 
    peer-focus:top-[5px] focus:top[12px] peer-focus:text-xs peer-focus:text-[rgba(94,100,136,1)]`}
                                        >Nro. de documento
                                        </label>
                                        {errors.dni && (
                                            <p className="text-[#ED002F] text-xs  absolute top-12 left-0  leading-4 mt-2 mb-4">
                                                *El documento ingresado no es válido
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        name="celular"
                                        id="celular"
                                        value={formData.celular}
                                        onChange={handleChange}
                                        placeholder=" "
                                        className={`w-full h-[56px] border ${errors.celular ? "border-[#ED002F]" : "border-[rgba(94,100,136,1)]"} rounded-md px-4 py-4 focus:outline-none focus:ring-0 focus:border-[rgba(94,100,136,1)] focus:[box-shadow:unset] peer bg-transparent`}
                                    />
                                    <label
                                        htmlFor="celular"
                                        className={`pointer-events-none absolute left-4 transition-all text-sm 
    ${formData.celular
                                                ? "top-[5px] text-xs text-[rgba(94,100,136,1)]"
                                                : "top-1/2 -translate-y-1/2 text-base text-[rgba(3,5,15,1)]"} 
    peer-focus:top-[5px] peer-focus:text-xs peer-focus:text-[rgba(94,100,136,1)]`}
                                    >
                                        Celular
                                    </label>
                                    {errors.celular && (
                                        <p className="text-[#ED002F] text-xs  absolute top-12 left-0  leading-4 mt-2 mb-4">
                                            *El celular ingresado no es válido
                                        </p>
                                    )}
                                </div>

                                <div className="flex w-full items-center gap-2">
                                    <input
                                        id="privacidad"
                                        type="checkbox"
                                        name="privacidad"
                                        checked={formData.privacidad}
                                        onChange={handleChange}
                                        className={`accent-[rgba(3,5,15,1)] w-[20px] h-[20px] rounded-sm border ${errors.privacidad ? "border-[#ED002F]" : "border-[rgba(94,100,136,1)]"} cursor-pointer`}
                                    />
                                    <label
                                        htmlFor="privacidad"
                                        className={`${errors.privacidad ? "text-[#ED002F]" : "text-[rgba(3,5,15,1)]"} text-xs text-left leading-tight w-full cursor-pointer`}
                                    >
                                        Acepto la Política de Privacidad
                                    </label>
                                </div>

                                <div className="flex w-full items-center gap-2">
                                    <input
                                        id="comunicaciones"
                                        type="checkbox"
                                        name="comunicaciones"
                                        checked={formData.comunicaciones}
                                        onChange={handleChange}
                                        className={`accent-[rgba(3,5,15,1)] w-[20px] h-[20px] rounded-sm border ${errors.comunicaciones ? "border-[#ED002F]" : "border-[rgba(94,100,136,1)]"} cursor-pointer`}
                                    />
                                    <label
                                        htmlFor="comunicaciones"
                                        className={`${errors.comunicaciones ? "text-[#ED002F]" : "text-[rgba(3,5,15,1)]"} text-xs text-left leading-tight w-full cursor-pointer`}
                                    >
                                        Acepto la Política de Comunicaciones Comerciales
                                    </label>
                                </div>



                                <p className="text-xs underline font-bold text-left mt-4 color-[rgba(3, 5, 15, 1)]">
                                    Aplican Términos y Condiciones.
                                </p>

                                {error && (
                                    <p className="text-[#ED002F] text-sm mt-2 text-left font-semibold">
                                        {error}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className=" w-full lg:w-[195px] text-xl bg-black text-white border border-transparent py-5 px-6 rounded-full cursor-pointer  hover:text-black hover:bg-transparent hover:border-black transition font-semibold"
                                >
                                    Cotiza aquí
                                </button>


                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Home;
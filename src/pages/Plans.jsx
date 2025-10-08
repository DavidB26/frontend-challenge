

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { IoIosArrowDropleft } from "react-icons/io";
import icon1 from "../assets/icon-1.webp";
import icon2 from "../assets/icon-2.webp";

// Helper para calcular edad desde fecha de nacimiento en formato "dd-mm-yyyy"
const getAgeFromBirthDay = (birthDayStr) => {
  if (!birthDayStr) return undefined;
  const [dd, mm, yyyy] = birthDayStr.split("-");
  const birthDate = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  if (isNaN(birthDate.getTime())) return undefined;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};


const Planes = () => {
    const [user, setUser] = useState(null);
    const [plans, setPlans] = useState([]);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData) {
          if (typeof userData.age !== "number" && userData.birthDay) {
            const computedAge = getAgeFromBirthDay(userData.birthDay);
            if (typeof computedAge === "number") {
              userData.age = computedAge;
              localStorage.setItem("userData", JSON.stringify(userData));
            }
          }
          setUser(userData);
        }
    }, []);

    useEffect(() => {
        const fetchPlans = async () => {
            const res = await fetch("https://rimac-front-end-challenge.netlify.app/api/plans.json");
            const data = await res.json();
            if (user) {
                const userAge = typeof user.age === "number" ? user.age : getAgeFromBirthDay(user.birthDay);
                if (typeof userAge !== "number") {
                  console.warn("No se pudo determinar la edad del usuario.");
                  setPlans([]);
                  return;
                }
                // Mostrar planes donde la edad del usuario sea menor o igual al age del plan
                const validPlans = data.list.filter((plan) => userAge <= plan.age);
                setPlans(validPlans);
            }
        };
        if (user) fetchPlans();
    }, [user]);

    const handleSelectType = (type) => {
        setSelectedType(type);
        if (type === "mi") {
            setFilteredPlans(plans);
        } else {
            // Para alguien más: 5% descuento
            const discounted = plans.map((p) => ({
                ...p,
                price: (p.price * 0.95).toFixed(2),
            }));
            setFilteredPlans(discounted);
        }
    };

    const handleSelectPlan = (plan) => {
        localStorage.setItem("selectedPlan", JSON.stringify(plan));
        navigate("/resumen");
    };

    return (
        
        <Layout showFooter={false} showProgress={true} currentStep={1}>
            <div
            className="min-h-screen py-12 px-6  w-[1360px] flex flex-col items-center"
            >
            <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-[#4F46E5] text-lg  mb-6 self-start hover:underline cursor-pointer"
            >
              <IoIosArrowDropleft className="text-3xl" />
                Volver
            </button>
            <h2
                className="text-[28px] md:text-[40px] font-bold text-center mb-2"
                style={{ color: "rgba(3,5,15,1)" }}
            >
                {user ? `${user.name}, ¿Para quién deseas cotizar?` : "¿Para quién deseas cotizar?"}
            </h2>
            <p
                className="text-base text-center mb-8"
                style={{ color: "rgba(94,100,136,1)" }}
            >
                Selecciona la opción que se ajuste más a tus necesidades.
            </p>

            {/* Opciones */}
            <div className="flex flex-col md:flex-row gap-6 mb-10 w-full max-w-3xl">
              <div
                onClick={() => handleSelectType("mi")}
                className={`relative cursor-pointer flex flex-col items-start justify-between p-6 rounded-[23px] transition-all w-[256px] h-[212px] ${
                  selectedType === "mi"
                    ? "border-[3px] border-[#03050F]"
                    : "border border-transparent"
                }`}
                style={{
                  background: "#fff",
                  boxShadow:
                    selectedType === "mi"
                      ? "0 8px 20px rgba(0, 0, 0, 0.08)"
                      : "0 4px 10px rgba(0, 0, 0, 0.04)",
                }}
              >
                <img
                  src={icon1}
                  alt="Para mí"
                  className="w-10 h-10 mb-3"
                />
                <div>
                  <h3
                    className="font-bold mb-1 text-[20px]"
                    style={{ color: "rgba(3,5,15,1)" }}
                  >
                    Para mí
                  </h3>
                  <p
                    className="text-xs leading-tight"
                    style={{ color: "rgba(94,100,136,1)" }}
                  >
                    Cotiza tu seguro de salud y agrega familiares si así lo deseas.
                  </p>
                </div>
                {selectedType === "mi" ? (
                  <div className="absolute top-3 right-3  rounded-full w-5 h-5 flex items-center justify-center" style={{ backgroundColor: "rgba(56, 158, 13, 1)" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="white"
                      className="w-3 h-3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full border" style={{ borderColor: "rgba(169, 175, 217, 1)"}}></div>
                )}
              </div>

              <div
                onClick={() => handleSelectType("otro")}
                className={`relative cursor-pointer flex flex-col items-start justify-between p-6 rounded-[23px] transition-all w-[256px] h-[212px] ${
                  selectedType === "otro"
                    ? "border-[3px] border-[#03050F]"
                    : "border border-transparent"
                }`}
                style={{
                  background: "#fff",
                  boxShadow:
                    selectedType === "otro"
                      ? "0 8px 20px rgba(0, 0, 0, 0.08)"
                      : "0 4px 10px rgba(0, 0, 0, 0.04)",
                }}
              >
                <img
                  src={icon2}
                  alt="Para alguien más"
                  className="w-10 h-10 mb-3"
                />
                <div>
                  <h3
                    className="font-bold mb-1 text-[20px]"
                    style={{ color: "rgba(3,5,15,1)" }}
                  >
                    Para alguien más
                  </h3>
                  <p
                    className="text-xs leading-tight"
                    style={{ color: "rgba(94,100,136,1)" }}
                  >
                    Realiza una cotización para uno de tus familiares o cualquier persona.
                  </p>
                </div>
                {selectedType === "otro" ? (
                  <div className="absolute top-3 right-3 rounded-full w-5 h-5 flex items-center justify-center" style={{ backgroundColor: "rgba(56, 158, 13, 1)" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="white"
                      className="w-3 h-3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full border" style={{ borderColor: "rgba(169, 175, 217, 1)"}}></div>
                )}
              </div>
            </div>

            {/* Planes */}
            {selectedType && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                    {filteredPlans.map((plan) => (
                        <div
                            key={plan.name}
                            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between"
                            style={{
                                color: "rgba(3,5,15,1)",
                                fontFamily: "inherit",
                                minHeight: 370,
                            }}
                        >
                            {plan.recommended && (
                                <span
                                    className="text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit"
                                    style={{
                                        background: "#7DF0BA",
                                        color: "rgba(3,5,15,1)",
                                        display: "inline-block",
                                    }}
                                >
                                    Plan recomendado
                                </span>
                            )}
                            <div>
                                <h4 className="font-bold text-lg mb-2" style={{ color: "rgba(3,5,15,1)" }}>
                                    {plan.name}
                                </h4>
                                <p
                                    className="text-sm mb-1 font-semibold"
                                    style={{ color: "rgba(94,100,136,1)" }}
                                >
                                    COSTO DEL PLAN
                                </p>
                                <p className="font-bold text-lg mb-3" style={{ color: "rgba(3,5,15,1)" }}>
                                    ${Number(plan.price).toLocaleString("es-PE", { minimumFractionDigits: 2 })} al mes
                                </p>
                                <ul className="text-sm list-disc pl-5 space-y-1" style={{ color: "rgba(94,100,136,1)" }}>
                                    {plan.description.map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                    ))}
                                    {plan.benefits && Array.isArray(plan.benefits) && plan.benefits.map((benef, i) => (
                                        <li key={`benef-${i}`}>{benef}</li>
                                    ))}
                                </ul>
                            </div>
                            <button
                                onClick={() => handleSelectPlan(plan)}
                                className="font-bold py-3 mt-6 rounded-full transition"
                                style={{
                                    background: "#ED002F",
                                    color: "#fff",
                                    borderRadius: 50,
                                }}
                            >
                                Seleccionar plan
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </Layout>
    );
};

export default Planes;
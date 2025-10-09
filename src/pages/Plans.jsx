import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { IoIosArrowBack, IoIosArrowDropleft } from "react-icons/io";
import icon1 from "../assets/icon-1.webp";
import icon2 from "../assets/icon-2.webp";
import icon3 from "../assets/icon-3.webp";
import icon4 from "../assets/icon-4.webp";


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

    // Bloquear navegación hacia atrás (versión mejorada)
    useEffect(() => {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = ""; // muestra aviso en caso de recarga
      };

      const handlePopState = (event) => {
        event.preventDefault();
        navigate("/plans", { replace: true }); // evita volver al login
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("popstate", handlePopState);
      };
    }, [navigate]);

    // Carrusel refs y estado
    const carouselRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const scrollToSlide = (index) => {
      if (carouselRef.current) {
        const cardWidth = carouselRef.current.children[0].offsetWidth + 24;
        carouselRef.current.scrollTo({
          left: index * cardWidth,
          behavior: "smooth",
        });
      }
    };

    const handleScroll = () => {
      if (!carouselRef.current) return;
      const scrollLeft = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.children[0].offsetWidth + 24;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentSlide(newIndex);
    };

    const handleNext = () => {
      if (currentSlide < filteredPlans.length - 1) {
        scrollToSlide(currentSlide + 1);
      }
    };

    const handlePrev = () => {
      if (currentSlide > 0) {
        scrollToSlide(currentSlide - 1);
      }
    };

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

          const validPlans = data.list
            .filter((plan) => userAge <= plan.age)
            .map((plan) => ({
              ...plan,
              description: plan.description.map((desc) =>
                desc
                  .replace(/Médico general a domicilio/g, "<b>Médico general a domicilio</b>")
                  .replace(/Videoconsulta/g, "<b>Videoconsulta</b>")
                  .replace(/Indemnización/g, "<b>Indemnización</b>")
                  .replace(/Consultas en clínica/g, "<b>Consultas en clínica</b>")
                  .replace(/Medicinas y exámenes/g, "<b>Medicinas y exámenes</b>")
                  .replace(/más de 200 clínicas del país/g, "<b>más de 200 clínicas del país</b>")
                  .replace(/Chequeo preventivo general/g, "<b>Chequeo preventivo general</b>")
                  .replace(/Vacunas/g, "<b>Vacunas</b>")
                  .replace(/Incluye todos los beneficios del plan en casa\.?/gi, "<b>Incluye todos los beneficios del plan en casa</b>")
              ),
            }));

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

      
        setCurrentSlide(0);
        if (carouselRef.current) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
    };

    const handleSelectPlan = (plan) => {
        localStorage.setItem("selectedPlan", JSON.stringify(plan));
        navigate("/summary");
    };

    const handleBack = () => {
      navigate("/");
    };

    return (
        
        <Layout showFooter={false} showProgress={true} currentStep={1}>
            <div
            className="min-h-screen py-12 px-6  md:w-[1360px] flex flex-col items-center"
            >
       <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#4F46E5] font-semibold mb-6 cursor-pointer self-start"
        >
          <IoIosArrowBack size={18} />
          Volver
        </button>
            <h2
                className="text-[28px] md:text-[40px] font-bold  text-left md:text-center mb-2"
                style={{ color: "rgba(3,5,15,1)" }}
            >
                {user ? `${user.name}, ¿Para quién deseas cotizar?` : "¿Para quién deseas cotizar?"}
            </h2>
            <p
                className="text-base text-left md:text-center mb-8"
                style={{ color: "rgba(94,100,136,1)" }}
            >
                Selecciona la opción que se ajuste más a tus necesidades.
            </p>

            {/* Opciones */}
            <div className="flex flex-col md:flex-row gap-6 mb-10 w-full max-w-3xl justify-center items-center md:items-stretch">
              <div
                onClick={() => handleSelectType("mi")}
                className={`relative cursor-pointer flex flex-col items-start justify-center p-6 rounded-[23px] transition-all w-full max-w-[288px] md:w-[256px] md:h-[212px] ${
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
                className={`relative cursor-pointer flex flex-col items-start justify-center p-6 rounded-[23px] transition-all w-full max-w-[288px] md:w-[256px] md:h-[212px] ${
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
              <>
                {/* Mobile Carrusel */}
                <div className="w-full max-w-4xl flex md:hidden flex-col items-center">
                  <div
                    ref={carouselRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-2 scrollbar-hide scroll-smooth w-full max-w-[360px] sm:max-w-[420px] pb-4"
                    style={{ scrollBehavior: "smooth" }}
                  >
                    {filteredPlans.map((plan, index) => {
                      const icons = [icon3, icon4, icon3];
                      return (
                        <div
                          key={plan.name}
                          className="relative bg-white shadow-lg rounded-2xl flex flex-col w-[288px] min-h-[640px] pt-[68px] pb-[51px] px-[32px] snap-center flex-shrink-0"
                          style={{
                            color: "rgba(3,5,15,1)",
                            fontFamily: "inherit",
                            minHeight: 370,
                          }}
                        >
                          {index === 1 && (
                            <span
                              className="absolute top-10 rounded-md left-7 text-xs font-bold px-3 py-1"
                              style={{
                                background: "#7DF0BA",
                                color: "rgba(3,5,15,1)",
                              }}
                            >
                              Plan recomendado
                            </span>
                          )}
                          <div className="flex items-center justify-between mb-6 gap-2">
                            <h4 className="font-bold text-2xl" style={{ color: "rgba(3,5,15,1)" }}>
                              {plan.name}
                            </h4>
                            <img src={icons[index]} alt="icono plan" className="img-fluid" />
                          </div>
                          <p className="text-xs mb-1" style={{ color: "rgba(121, 129, 178, 1)" }}>
                            COSTO DEL PLAN
                          </p>
                          {selectedType === "otro" ? (
                            <div className="mb-12 relative">
                              <p className="text-sm line-through text-gray-400 mb-1" style={{ color: "rgba(121,129,178,1)" }}>
                                ${Number(plan.price / 0.95).toLocaleString("es-PE", { minimumFractionDigits: 2 })} antes
                              </p>
                              <p className="font-bold text-xl" style={{ color: "rgba(3,5,15,1)" }}>
                                ${Number(plan.price).toLocaleString("es-PE", { minimumFractionDigits: 2 })} al mes
                              </p>
                              <span
                                className="absolute left-0 right-0 -bottom-6 block h-px"
                                style={{ background: "rgba(169,175,217,0.4)" }}
                                aria-hidden="true"
                              />
                            </div>
                          ) : (
                            <div className="relative mb-12">
                              <p className="font-bold text-xl" style={{ color: "rgba(3,5,15,1)" }}>
                                ${Number(plan.price).toLocaleString("es-PE", { minimumFractionDigits: 2 })} al mes
                              </p>
                              <span
                                className="absolute left-0 right-0 -bottom-6 block h-px"
                                style={{ background: "rgba(169,175,217,0.4)" }}
                                aria-hidden="true"
                              />
                            </div>
                          )}
                          <ul className="flex-1 text-base list-disc pl-5 space-y-6" style={{ color: "rgba(20, 25, 56, 1)" }}>
                            {plan.description.map((desc, i) => (
                              <li key={i} dangerouslySetInnerHTML={{ __html: desc }} />
                            ))}
                            {plan.benefits && Array.isArray(plan.benefits) &&
                              plan.benefits.map((benef, i) => <li key={`benef-${i}`}>{benef}</li>)}
                          </ul>
                          <button
                            onClick={() => handleSelectPlan(plan)}
                            className="font-bold py-3 mt-6 rounded-full transition cursor-pointer"
                            style={{
                              background: "#ED002F",
                              color: "#fff",
                              borderRadius: 50,
                            }}
                          >
                            Seleccionar plan
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Indicador y botones */}
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                      onClick={handlePrev}
                      disabled={currentSlide === 0}
                      className="w-8 h-8 border border-[#4F46E5] text-[#4F46E5] rounded-full flex items-center justify-center disabled:opacity-40"
                    >
                      ←
                    </button>
                    <span className="text-sm font-medium text-[#03050F]">
                      {currentSlide + 1} / {filteredPlans.length}
                    </span>
                    <button
                      onClick={handleNext}
                      disabled={currentSlide === filteredPlans.length - 1}
                      className="w-8 h-8 border border-[#4F46E5] text-[#4F46E5] rounded-full flex items-center justify-center disabled:opacity-40"
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Desktop grid */}
                <div className="hidden md:grid md:grid-cols-3 gap-8 w-full max-w-4xl">
                  {filteredPlans.map((plan, index) => {
                    const icons = [icon3, icon4, icon3];
                    return (
                      <div
                        key={plan.name}
                        className="relative bg-white shadow-lg rounded-2xl flex flex-col w-[288px] min-h-[640px] pt-[68px] pb-[51px] px-[32px]"
                        style={{
                          color: "rgba(3,5,15,1)",
                          fontFamily: "inherit",
                          minHeight: 370,
                        }}
                      >
                        {index === 1 && (
                          <span
                            className="absolute top-10 rounded-md left-7 text-xs font-bold px-3 py-1"
                            style={{
                              background: "#7DF0BA",
                              color: "rgba(3,5,15,1)",
                            }}
                          >
                            Plan recomendado
                          </span>
                        )}
                        <div className="flex items-center justify-between mb-6 gap-2">
                          <h4 className="font-bold text-2xl" style={{ color: "rgba(3,5,15,1)" }}>
                            {plan.name}
                          </h4>
                          <img src={icons[index]} alt="icono plan" className="img-fluid" />
                        </div>
                        <p className="text-xs mb-1" style={{ color: "rgba(121, 129, 178, 1)" }}>
                          COSTO DEL PLAN
                        </p>
                        <p className="font-bold text-xl mb-12" style={{ color: "rgba(3,5,15,1)" }}>
                          ${Number(plan.price).toLocaleString("es-PE", { minimumFractionDigits: 2 })} al mes
                        </p>
                        <ul className="flex-1 text-base list-disc pl-5 space-y-6" style={{ color: "rgba(20, 25, 56, 1)" }}>
                          {plan.description.map((desc, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: desc }} />
                          ))}
                        </ul>
                        <button
                          onClick={() => handleSelectPlan(plan)}
                          className="font-bold py-3 mt-6 rounded-full transition cursor-pointer"
                          style={{
                            background: "#ED002F",
                            color: "#fff",
                            borderRadius: 50,
                          }}
                        >
                          Seleccionar plan
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
        </div>
        </Layout>
    );
};

export default Planes;
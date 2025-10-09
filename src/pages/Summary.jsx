import { useNavigate } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Summary = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const storedPlan = JSON.parse(localStorage.getItem("selectedPlan"));
    setUser(storedUser);
    setSelectedPlan(storedPlan);
  }, []);

  const handleBack = () => {
    navigate("/plans");
  };

  return (

    <Layout  showFooter={false} showProgress={true} currentStep={2} onBack={handleBack}>
    <div className="min-h-screen md:w-[1360px]">
 
      <div className="max-w-4xl mx-auto py-10">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#4F46E5] font-semibold mb-6 cursor-pointer"
        >
          <IoIosArrowBack size={18} />
          Volver
        </button>

        <h1
          className="text-[32px] font-bold mb-8"
          style={{ color: "rgba(3,5,15,1)" }}
        >
          Resumen del seguro
        </h1>

        <div className="bg-white shadow-md rounded-2xl p-6 md:p-10">
          <p
            className="text-[10px] font-semibold uppercase mb-1"
            style={{ color: "rgba(121,129,178,1)" }}
          >
            Precios calculados para:
          </p>

          <div className="flex items-center gap-2 mb-4">
            <FaUserFriends className="text-[#03050F]" size={20} />
            <h2 className="text-[20px] font-bold" style={{ color: "rgba(3,5,15,1)" }}>
              {user ? `${user.nameComplete || `${user.name || ""} ${user.lastName || ""}`}`.trim() : "Usuario no especificado"}
            </h2>
          </div>

          <hr className="border-t border-gray-200 mb-4" />

          <div className="space-y-3">
            <div>
              <p className="font-semibold text-base" style={{ color: "rgba(3,5,15,1)" }}>
                Responsable de pago
              </p>
              <p className="text-gray-700 text-sm">DNI: {user?.dni || "—"}</p>
              <p className="text-gray-700 text-sm">Celular: {user?.celular || "—"}</p>
            </div>

            <div>
              <p className="font-semibold mt-4 text-base" style={{ color: "rgba(3,5,15,1)" }}>
                Plan elegido
              </p>
              <p className="text-gray-700 text-sm">{selectedPlan?.name || "—"}</p>
              <p className="text-gray-700 text-sm">
                Costo del plan: $
                {selectedPlan?.price
                  ? Number(selectedPlan.price).toLocaleString("es-PE", {
                      minimumFractionDigits: 2,
                    })
                  : "—"}{" "}
                al mes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Summary;
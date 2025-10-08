// src/components/ProgressBar.jsx
const ProgressBar = ({ currentStep = 1 }) => {
    return (
      <div className="w-full flex justify-center  py-4 h-[56px]" style={{ backgroundColor: "rgba(237, 239, 252, 1)" }}>
        <div className="max-w-4xl flex items-center gap-6">
          {/* Paso 1 */}
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full font-bold text-sm ${
                currentStep === 1
                  ? "bg-[#4F46E5] text-white"
                  : "border border-[#4F46E5] text-[#4F46E5]"
              }`}
            >
              1
            </div>
            <span
              className={`font-semibold ${
                currentStep === 1 ? "text-[#03050F]" : "text-gray-500 opacity-60"
              }`}
            >
              Planes y coberturas
            </span>
          </div>
  
          {/* Línea divisoria */}
          <div
            className="w-10 h-[2px] mx-2"
            style={{ background: "rgba(79,70,229,0.3)" }}
          ></div>
  
          {/* Paso 2 */}
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full font-bold text-sm ${
                currentStep === 2
                  ? "bg-[#4F46E5] text-white"
                  : "border border-[#4F46E5] text-[#4F46E5]"
              }`}
            >
              2
            </div>
            <span
              className={`font-semibold ${
                currentStep === 2 ? "text-[#03050F]" : "text-gray-500 opacity-60"
              }`}
            >
              Resumen
            </span>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
import { IoIosArrowBack } from "react-icons/io";

const ProgressBar = ({ currentStep = 1, onBack }) => {
  const progressWidth = currentStep === 1 ? "50%" : "100%";

  return (
    <div className="w-full" style={{ backgroundColor: "rgba(237, 239, 252, 1)" }}>
    
      <div className="hidden md:flex justify-center py-4 h-[56px]">
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

      {/* Mobile */}
      <div className="flex md:hidden items-center gap-4 py-3 px-4">
        <button
          onClick={onBack}
          className="w-7 h-7 flex items-center justify-center border-2 border-[#4F46E5] rounded-full"
        >
          <IoIosArrowBack className="text-[#4F46E5] text-lg" />
        </button>
        <div className="flex-1">
          <p className="text-xs font-bold text-[#03050F] mb-1">
            PASO {currentStep} DE 2
          </p>
          <div className="w-full bg-[#E0E2F1] rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-[#4F46E5] rounded-full transition-all duration-300"
              style={{ width: progressWidth }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
import { useState } from "react";
import Layout from "../components/Layout";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dni: "",
    celular: "",
    privacidad: false,
    comunicaciones: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.dni ||
      !formData.celular ||
      !formData.privacidad ||
      !formData.comunicaciones
    ) {
      setError("Por favor completa todos los campos y acepta los términos.");
      return;
    }
    setError("");

    try {
      const res = await fetch("https://rimac-front-end-challenge.netlify.app/api/user.json");
      const data = await res.json();

      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...data,
          dni: formData.dni,
          celular: formData.celular,
        })
      );

      // navigate("/plans");
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <Layout>
      <section className="relative flex items-center justify-center bg-[rgba(248,249,255,1)]">
        <div className="max-w-[1360px] w-full flex items-center justify-between gap-8 mx-auto px-6">
            
        <div className="absolute left-[-200px] bottom-[-100px] w-[600px] h-[600px] bg-[rgba(195,51,255,0.8)] blur-[200px]"></div>
        <div className="absolute right-[-150px] top-[100px] w-[500px] h-[500px] bg-[rgba(0,244,226,0.8)] blur-[180px]"></div>

          {/* Imagen izquierda */}
          <div className="hidden md:block w-[48%] max-h-[600px] relative z-10">
            <img
              src="/src/assets/img-family.webp"
              alt="familia feliz"
              className="w-full h-full object-cover rounded-l-3xl"
            />
          </div>

          {/* Formulario */}
          <div className="flex flex-col justify-center w-[352px] max-w-md px-8 py-10 rounded-2xl   relative z-10">
            <h1 className="px-3 py-1 text-base font-semibold text-black rounded-md bg-gradient-to-r from-[#00F4E2] to-[#00FF7F] mb-2">
              Seguro Salud Flexible
            </h1>

            <h2 className="text-[32px] font-bold mb-6 text-gray-800 leading-[38px] text-left">
              Creado para ti y tu familia
            </h2>

            <p className="mb-8 text-sm font-semibold "  style={{ color: "rgba(3, 5, 15, 1)" }}>
              Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex ">
                <select className="w-1/3 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" name="dni">
                  <option>DNI</option>
                </select>
                <input
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  placeholder="Nro. de documento"
                  className="w-2/3 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Celular
                </label>
                <input
                  type="text"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  placeholder="Número de celular"
                  className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="privacidad"
                  checked={formData.privacidad}
                  onChange={handleChange}
                  className="accent-blue-500 w-4 h-4"
                />
                <label className="text-sm text-gray-700">
                  Acepto la Política de Privacidad
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="comunicaciones"
                  checked={formData.comunicaciones}
                  onChange={handleChange}
                  className="accent-blue-500 w-4 h-4"
                />
                <label className="text-sm text-gray-700">
                  Acepto la Política de Comunicaciones Comerciales
                </label>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <button
                type="submit"
                className="self-start bg-black text-white border border-transparent py-2 px-6 rounded-full  hover:text-black hover:bg-white transition font-semibold"
              >
                Cotiza aquí
              </button>

              <p className="text-xs text-gray-400 mt-4">
                Aplican Términos y Condiciones.
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
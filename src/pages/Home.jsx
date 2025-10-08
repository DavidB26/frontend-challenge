import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

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

    // Validación simple
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

    // Consumir API de usuario
    try {
      const res = await fetch("https://rimac-front-end-challenge.netlify.app/api/user.json");
      const data = await res.json();

      // Guardar usuario en localStorage o context
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...data,
          dni: formData.dni,
          celular: formData.celular,
        })
      );

      navigate("/plans");
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 via-blue-100 to-white">
      {/* Imagen izquierda (solo desktop) */}
      <div className="hidden md:block w-1/2">
        <img
          src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92b67?q=80&w=800"
          alt="familia feliz"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Formulario */}
      <div className="flex flex-col justify-center w-full md:w-1/2 max-w-md px-8 py-12 bg-white shadow-lg rounded-xl">
        <h1 className="text-[#007bff] font-semibold mb-2 text-sm uppercase">
          Seguro Salud Flexible
        </h1>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Creado para ti y tu familia
        </h2>
        <p className="text-gray-500 mb-8">
          Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              DNI
            </label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              placeholder="Nro. de documento"
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            Cotiza aquí
          </button>

          <p className="text-xs text-gray-400 mt-4">
            Aplican Términos y Condiciones.
          </p>
        </form>
      </div>
    </section>
  );
};

export default Home;
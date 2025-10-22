

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_KEY } from "../utils/auth";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem("userData");
    } finally {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return null;
}
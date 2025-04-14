import { useState } from "react";
import { apiService } from "../services/api";
import "../components/layouts/login/login.css";
import PasswordForm from "../components/layouts/login/PasswordForm";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const Nvcompte = () => {
  //   navigate("/Nvcompte");
  // };
  

  const handleSubmit = async ({ email, password }) => {
    try {
      setError("");
      setLoading(true);
      const hashedPassword = CryptoJS.SHA256(password).toString();
      // Appel à l'API d'authentification
      const userData = await apiService.getUser(email, hashedPassword);
      
      // Si l'authentification réussit, stocker les données utilisateur et rediriger
      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/Home");
      }
      
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setError(error.message || "Identifiants incorrects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Connexion Pokémon</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <PasswordForm 
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      </div>
      {/* <button className="nav-item" onClick={Nvcompte}>Ajouter un compte ?</button> */}
    </div>
  );
}

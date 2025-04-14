import { useState } from "react";
import { apiService } from "../services/api";
import "../components/layouts/donner/donner.css";
import DonnerForm from "../components/layouts/donner/donnercomp.jsx";
import { useNavigate } from "react-router-dom";
import HeaderMenu from '../components/layouts/navigation/header';

export default function DonnerPage() {
  const [search, setSearch] = useState("");
  const [Cate, setCate] = useState("");
  const [Lang, setLang] = useState("french");
  const [Ajout, setAjout] = useState(true);
  const [Home, setHome] = useState(true);
  const [Fav, setFav] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async ({ email, id }) => {
    try {
      setError("");
      setSuccessMessage("");
      setLoading(true);
      
      // Appel à l'API pour donner la carte
      const result = await apiService.giveCard(email, id);
      
      // Si l'opération réussit, afficher un message de succès et rediriger
      setSuccessMessage("Carte envoyée avec succès !");
     // Attendre 2 secondes avant la redirection pour que l'utilisateur voie le message

    } catch (error) {
      console.error("Erreur lors de l'envoi de la carte:", error);
      setError(error.message || "Erreur lors de l'envoi de la carte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeaderMenu 
        verif={setSearch} 
        verif2={setCate} 
        verif3={setLang} 
        verif5={setHome} 
        verif6={setAjout} 
        verif4={setFav} 
      />
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Envoyer une carte</h2>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}
          
          <DonnerForm
            onSubmit={handleSubmit}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
}

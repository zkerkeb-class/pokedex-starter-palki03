import { useState } from "react";
import "./login.css";

const PasswordForm = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation basique
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    
    setError("");
    onSubmit({ email, password });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      
      <div className="input-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-input"
          required
        />
      </div>
      
      <div className="input-group">
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-input"
          required
        />
      </div>
      
      <button 
        type="submit"
        disabled={isLoading}
        className="login-button"
      >
        {isLoading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
};

export default PasswordForm; 
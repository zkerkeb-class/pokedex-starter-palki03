import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Donner.css';

const DonnerForm = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');

  const location = useLocation();
 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation basique
    if (!email || !id) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    // Validation pour s'assurer que le numéro de carte est un entier positif
    if (!/^\d+$/.test(id)) {
      setError('Le numéro de carte doit être un nombre entier positif');
      return;
    }

    setError('');
    onSubmit({ email, id });
  };

  

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}

      <div className="input-group">
        <input
          type="email"
          placeholder="Email du destinataire"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-input"
          required
        />
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Numéro de carte"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="text-input"
          required
        />
      </div>

      <button type="submit" className="login-button">Envoyer la carte</button>
    </form>
  );
};

export default DonnerForm;

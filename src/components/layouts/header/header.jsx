import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderMenu = ({ verif, verif2, verif3, verif5, verif6, verif4 }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isPokemonPage = location.pathname.startsWith('/pokemon');
  const isMenu = location.pathname.startsWith('/menu');
  
  const Change = (texte) => {
    setSearch(texte.target.value);
    verif(texte.target.value);
  };

  const ChangeHome = () => {
    verif5(true);
    verif6(false);
    if (isMenu) {
      navigate("/Home");
    } else {
      navigate('/menu');//on va sur la page d'ajout de
    }
  };

  const ChangeMenu = () => {
    verif5(true);
    verif6(false);
    if (isPokemonPage) {
      navigate("/Home");
    } else {
      navigate('/pokemon/1');
    }
  };

  const TypeChange = (type) => {
    verif2(type.target.value);
  };

  const LangueChange = (langue) => {
    verif3(langue.target.value);
  };

  const FavorisChange = () => {
    verif4(prev => prev === 0 ? 1 : 0);
  };

  return (
    <nav>
        {isMenu && (
        <a href="#" className="nav-item is-active" onClick={ChangeHome}>
          Menu
        </a>
      )}
      {!isMenu && (
        <a href="#" className="nav-item is-active" onClick={ChangeHome}>
          Favoris
        </a>
      )}
    
      {isPokemonPage && (
        <a href="#" className="nav-item is-active" onClick={ChangeMenu}>
          Menu
        </a>
      )}
      {!isPokemonPage && (
        <a href="#" className="nav-item is-active" onClick={ChangeMenu}>
          Ajouter
        </a>
      )}
    
      <select 
        name="Langue" 
        id="Langage" 
        className="nav-item" 
        style={{ backgroundColor: 'white', border: '0px', outline: 'none' }}
        onChange={LangueChange}
      >
        <option value="french">FRANCAIS</option>
        <option value="english">ANGLAIS</option>
        <option value="japanese">JAPONAIS</option>
        <option value="chinese">CHINOIS</option>
      </select>
      <select 
        name="types" 
        id="types" 
        className="nav-item" 
        style={{ backgroundColor: 'white', border: '0px', outline: 'none' }}
        onChange={TypeChange}
      >
        <option value="">TOUS LES TYPES</option>
        <option value="Fighting">COMBAT</option>
        <option value="Dragon">DRAGON</option>
        <option value="Water">EAU</option>
        <option value="Electric">ELECTRIQUE</option>
        <option value="Ghost">FANTOME</option>
        <option value="Fairy">FEE</option>
        <option value="Fire">FEU</option>
        <option value="Ice">GIVRE</option>
        <option value="Bug">INSECTE</option>
        <option value="Normal">NORMAL</option>
        <option value="Steel">METAL</option>
        <option value="Grass">PLANTE</option>
        <option value="Poison">POISON</option>
        <option value="Psychic">PSY</option>
        <option value="Rock">ROCHE</option>
        <option value="Ground">SOL</option>
        <option value="Flying">VOL</option>
      </select>
      <input 
        type="text" 
        className="nav-item is active" 
        placeholder="Quel est ton prénom?" 
        value={search} 
        onChange={Change} 
      />
      <button className="nav-item">🔍</button>
    </nav>
  );
};

HeaderMenu.propTypes = {
  verif: PropTypes.func.isRequired,
  verif2: PropTypes.func.isRequired,
  verif3: PropTypes.func.isRequired,
  verif5: PropTypes.func.isRequired,
  verif6: PropTypes.func.isRequired,
  verif4: PropTypes.func.isRequired,
};

export default HeaderMenu;

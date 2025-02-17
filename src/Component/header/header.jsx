import { useState } from "react";
import PropTypes from "prop-types";

const HeaderMenu = ({ verif, verif2, verif3,verif5}) => {
  const [search, setSearch] = useState("");
  const [Home, setHome] = useState(true);
  
  
  const Change = (texte) => {
    setSearch(texte.target.value);
    verif(texte.target.value); // Met à jour le search dans le parent
  };

  const ChangeHome = () => {
    const newState = !Home;
    setHome(newState);
    verif5(newState); 
  };


  // Fonction pour gérer la sélection du type
  const TypeChange = (type) => {
    verif2(type.target.value); // Met à jour le type sélectionné dans le parent
  };
  const LangueChange = (langue) => {
    verif3(langue.target.value); // Met à jour le type sélectionné dans le parent
  };

  return (
    <nav>
      <a href="#" className="nav-item is-active" onClick={ChangeHome}>{!Home ? "Accueil" : "Favoris"}</a> 
      <select name="Langue" id="Langage"className="nav-item"style={{ backgroundColor: 'white', border: '0px', outline: 'none' }}onChange={LangueChange}>
        <option value="french">FRANCAIS</option>
        <option value="english">ANGLAIS</option>
        <option value="japanese">JAPONAIS</option>
        <option value="chinese">CHINOIS</option>
      </select>
      <select name="types" id="types"className="nav-item"style={{ backgroundColor: 'white', border: '0px', outline: 'none' }}onChange={TypeChange}>
        <option value="">TOUS LES TYPES</option>
        <option value="Fighting">COMBAT</option>
        <option value="Dragon">DRAGON</option>
        <option value="water">EAU</option>
        <option value="Electric">ELECTIQUE</option>
        <option value="Ghost">FANTOME</option>  
        <option value="Fairy">FEE</option>
        <option value="fire">FEU</option> 
        <option value="Ice">GIVRE</option>
        <option value="Bug">INSECTE</option>
        <option value="Normal">NORMAL</option>
        <option value="Steel">METAL</option>
        <option value="Grass">PLANTE</option>
        <option value="poison">POISON</option>
        <option value="Psychic">PSY</option>
        <option value="Rock">ROCHE</option>
        <option value="Ground">SOL</option>
        <option value="Flying">VOL</option>
      </select>

      <input type="text" className="nav-item is active" placeholder="Nom ..." value={search} onChange={Change} />
      <button className="nav-item">🔍</button>
    </nav>
  );
};

HeaderMenu.propTypes = {
  verif: PropTypes.func.isRequired, 
  verif2: PropTypes.func.isRequired,
  verif3: PropTypes.func.isRequired,
  verif5: PropTypes.func.isRequired
};

export default HeaderMenu;

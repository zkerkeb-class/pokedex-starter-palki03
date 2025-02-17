import { useState } from "react";
import PropTypes from "prop-types";

const Header = ({ nom, image, type, attaque, spattaque, spdef, hp, speed, id, total, favoris, verif4 }) => {
  const [Fav, setFav] = useState(favoris === 1);

  const typeColorMap = {
    "Fire": "#cf7f7f",
    "Water": "#87C3F7",
    "Grass": "#9EC64C",
    "Electric": "#F5D95D",
    "Psychic": "#BE7EAD",
    "Ice": "#94c9ff",
    "Dragon": "#6A6A30",
    "Bug": "#9EC64C",
    "Fairy": "#D685AD",
    "Fighting": "#DCA362",
    "Poison": "#A269A9",
    "Ground": "#d68e41",
    "Rock": "#c09c56",
    "Ghost": "#656c8a",
    "Dark": "#494b46",
    "Steel": "#b0b8bc",
    "Normal": "#E6E4E2",
    // Ajoutez d'autres types ici si nécessaire
  };

  const ChangeFav = () => {
    const newFav = !Fav;
    setFav(newFav);
    verif4(id);
  };
  const primaryType = type.split(",")[0]; 
  console.log(primaryType);
  
  const backgroundColor = typeColorMap[primaryType] || "#ffffff"


  return (
    <div className="pokemon-card" style={{backgroundColor: backgroundColor}}>
      <div className="headercarte">
        <div className="informationheader">
          <p>{nom}</p>
          <p>HP : {hp}</p>
        </div>
      </div>

      <div className="headercarte img" style={{ backgroundColor: "#ffffff", border: "5px solid #edc131" }}>
        <div className="typecarte" style={{ position: "absolute", right: "4%", top: "15%" }}>{type}</div>
        <button className="typecarte favoris" style={{ position: "absolute", left: "4%", bottom: "35%", backgroundColor: Fav ? "gold" : "Gray" }}onClick={ChangeFav}>Favoris</button>
        <img src={image} alt={nom} />
      </div>

      <div className="headercarte" style={{ backgroundColor: backgroundColor, border: "0px", margin: "0px" }}>
        <div className="informationheader attaque">
          <p style={{ textAlign: "left", flex: 1 }}>Spe Def :</p>
          <p style={{ textAlign: "right" }}>{spdef}</p>
        </div>
        <div className="informationheader attaque">
          <p style={{ textAlign: "left", flex: 1 }}>Spe Attaque :</p>
          <p style={{ textAlign: "right" }}>{spattaque}</p>
        </div>
        <div className="informationheader attaque">
          <p style={{ textAlign: "left", flex: 1 }}>Speed :</p>
          <p style={{ textAlign: "right" }}>{speed}</p>
        </div>
        <div className="informationheader attaque">
          <p style={{ textAlign: "left", flex: 1 }}>Attaque :</p>
          <p style={{ textAlign: "right" }}>{attaque}</p>
        </div>
      </div>

      <div className="typecarte id" style={{ backgroundColor: '#ffffff', textAlign: 'left' }}>
        <p>{id}/{total}</p>
      </div>
    </div>
  );
};

Header.propTypes = {
  nom: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  attaque: PropTypes.number.isRequired,
  spattaque: PropTypes.number.isRequired,
  spdef: PropTypes.number.isRequired,
  hp: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  favoris: PropTypes.number.isRequired,
  verif4: PropTypes.func.isRequired,  // Fonction pour mettre à jour favoris
};

export default Header;

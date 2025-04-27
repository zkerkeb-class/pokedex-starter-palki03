import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { apiService } from "../../../services/api";

///composant representant la carte d'un pokemon

const Header = ({ pokemon, ChangeFav, isFavorite, language, total, onUpdate, isCreationMode, isInitialEditMode }) => {
  // Utiliser isInitialEditMode s'il est fourni, sinon utiliser isCreationMode (pour compatibilité)
  const [isEditing, setIsEditing] = useState(isInitialEditMode !== undefined ? isInitialEditMode : isCreationMode);
  const [pokemonData, setPokemonData] = useState(pokemon);
  const [isDeleted, setIsDeleted] = useState(false); // Nouvel état pour suivre si le Pokémon a été supprimé

  useEffect(() => {
    setPokemonData(pokemon);
  }, [pokemon]);
///affiche les couleurs en fonction des types
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
    "Flying": "#A890F0"
  };

  const handleChange = (e) => { 
    const { name, value } = e.target;
    if (name === "name") {
      setPokemonData(prev => ({ 
        ...prev,
        name: {
          french: value, 
          english: value,
          japanese: value,
          chinese: value
        }
      }));
    } else if (name === "hp") {
      setPokemonData(prev => ({
        ...prev,
        base: {
          ...prev.base,
          "HP": value
        }
      }));
    } else if (name === "spdef") {
      setPokemonData(prev => {
        if (prev.base["Sp. Defense"] !== undefined) {
          return {
            ...prev,
            base: {
              ...prev.base,
              "Sp. Defense": Number(value)
            }
          };
        } else if (prev.base.Sp && prev.base.Sp[" Defense"] !== undefined) {
          return {
            ...prev,
            base: {
              ...prev.base,
              Sp: {
                ...prev.base.Sp,
                " Defense": Number(value)
              }
            }
          };
        } else {
          return {
            ...prev,
            base: {
              ...prev.base,
              "Sp. Defense": Number(value)
            }
          };
        }
      });
    } else if (name === "spattaque") {
      // Pour l'attaque spéciale
      setPokemonData(prev => {
        if (prev.base["Sp. Attack"] !== undefined) {
          return {
            ...prev,
            base: {
              ...prev.base,
              "Sp. Attack": Number(value)
            }
          };
        } else if (prev.base.Sp && prev.base.Sp[" Attack"] !== undefined) {
          return {
            ...prev,
            base: {
              ...prev.base,
              Sp: {
                ...prev.base.Sp,
                " Attack": Number(value)
              }
            }
          };
        } else {
          return {
            ...prev,
            base: {
              ...prev.base,
              "Sp. Attack": Number(value)
            }
          };
        }
      });
    } else if (name === "speed") {
      setPokemonData(prev => ({
        ...prev,
        base: {
          ...prev.base,
          "Speed": value
        }
      }));
    } else if (name === "attaque") {
      setPokemonData(prev => ({
        ...prev,
        base: {
          ...prev.base,
          "Attack": value
        }
      }));
    } else {
      setPokemonData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      
      const normalizedData = { ...pokemonData };
      if (normalizedData.base.Sp) {
        if (normalizedData.base.Sp[" Attack"] !== undefined) {
          normalizedData.base["Sp. Attack"] = Number(normalizedData.base.Sp[" Attack"]);
        }
        if (normalizedData.base.Sp[" Defense"] !== undefined) {
          normalizedData.base["Sp. Defense"] = Number(normalizedData.base.Sp[" Defense"]);
        }

        delete normalizedData.base.Sp;
      }
      ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"].forEach(stat => {
        if (normalizedData.base[stat] !== undefined) {
          normalizedData.base[stat] = Number(normalizedData.base[stat]);
        }
      });
     
      if (isCreationMode) {
      console.log("true");
        const createdPokemon = await apiService.createPokemon(normalizedData);
        console.log("Pokémon créé:", createdPokemon);
        setIsEditing(false);
        if (onUpdate) {
          onUpdate(createdPokemon);
        }
      } else {
        console.log("pascration");
        const updatedPokemon = await apiService.updatePokemon(normalizedData,language);
        console.log("Pokémon mis à jour:", updatedPokemon);
        setIsEditing(false);
        if (onUpdate) {
          onUpdate(updatedPokemon);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du Pokémon:", error);
      alert("Une erreur est survenue lors de la sauvegarde du Pokémon : " + (error.message || "Erreur inconnue"));
    }
  };

  const handleCancel = () => {
    setPokemonData(pokemon);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      if (!pokemonData.id || pokemonData.id === 999) {
        alert("Impossible de supprimer ce Pokémon car son ID est invalide.");
        return;
      }
      
      if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${pokemonData.name[language] || pokemonData.name.french || "ce Pokémon"} ?`)) {
        console.log("Tentative de suppression du Pokémon avec ID:", pokemonData.id);
        
        const deletedPokemonId = pokemonData.id;
        
        try {
          const result = await apiService.deletePokemon(deletedPokemonId);
          console.log("Résultat de la suppression:", result);
          setIsDeleted(true);
          if (onUpdate) {
            onUpdate({ id: deletedPokemonId }, true);
          }
          
          if (ChangeFav) {
            ChangeFav(deletedPokemonId, true); 
          }
        } catch (apiError) {
          console.error("Erreur API lors de la suppression:", apiError);
          const errorMessage = apiError.message || "Une erreur inconnue est survenue";
          alert(`Erreur lors de la suppression du Pokémon: ${errorMessage}`);
        }
      }
    } catch (error) {
      console.error("Erreur générale lors de la suppression du Pokémon:", error);
      alert("Une erreur générale est survenue lors de la suppression du Pokémon.");
    }
  };
  const premierType = Array.isArray(pokemonData.type) ? pokemonData.type[0] : pokemonData.type;
  const backgroundColor = typeColorMap[premierType] || "#ffffff";

  if (isDeleted) {
    return null;
  }
  return (
    <div className="pokemon-card" style={{backgroundColor: backgroundColor}}>
      <div className="headercarte">
        <div className="informationheader">
          {isEditing ? ( ///si le bouton modifier est cliqué
            <input
              type="text"
              name="name"
              value={pokemonData.name[language] || ""}/// on met que des inputs
              onChange={handleChange}
              className="edit-input"
              style={{
                width: "100%",
                padding: "0",
                border: "none",
                backgroundColor: "transparent",
                fontSize: "1em",
                fontWeight: "normal",
                fontFamily: "inherit",
                color: "#000000"
              }}
            />
          ) : (
            <p style={{ fontSize: "1em", margin: "0" }}>{pokemonData.name[language] || pokemonData.name.french || "Sans nom"}</p>
          )}
          
          {isEditing ? ( ///si les hp changent
            <input
              type="number"
              name="hp"
              value={pokemonData.base["HP"]}
              onChange={handleChange}
              className="edit-input"
              style={{
                width: "100%",
                padding: "0",
                border: "none",
                backgroundColor: "transparent",
                fontSize: "inherit",
                fontFamily: "inherit",
                color: "#000000"
              }}
            />
          ) : (
            <p>HP : {pokemonData.base["HP"]}</p>
          )}
        </div>
      </div>

      <div className="headercarte img" style={{ backgroundColor: "#ffffff", border: "5px solid #edc131" }}> 
        {isEditing ? (
          <select
            name="type" ///si le type change 
            value={pokemonData.type}
            onChange={handleChange} 
            className="edit-input"
            style={{
              padding: "0",
              border: "none",
              backgroundColor: "transparent",
              fontSize: "inherit",
              fontFamily: "inherit",
              cursor: "pointer",
              color: "#000000"
            }}///affiche les propositions de types
          > 
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
        ) : (
          <div className="typecarte" style={{ position: "absolute", right: "4%", top: "15%" }}>{pokemonData.type}</div>
        )}
        <button 
          className="typecarte favoris" 
          style={{ 
            position: "absolute", 
            left: "4%", 
            bottom: "35%", 
            backgroundColor: isFavorite ? "#FFD700" : "#808080",
            color: isFavorite ? "#000000" : "#FFFFFF",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}
          onClick={ChangeFav}
        >
          Favoris
        </button>
        {isEditing ? (
          <div style={{
            position: "relative",
            width: "279px",
            height: "203px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <textarea
              name="image"
              value={pokemonData.image}
              onChange={handleChange}
              className="edit-input"
              placeholder="Entrez l'URL de l'image"
              style={{
                width: "90%",
                height: "90%",
                padding: "10px",
                border: "1px dashed #ccc",
                backgroundColor: "#f9f9f9",
                fontSize: "0.9em",
                fontFamily: "inherit",
                color: "#000000",
                resize: "none",
                overflow: "auto"
              }}
            />
            <div style={{ fontSize: "0.8em", marginTop: "5px", color: "#666" }}>
              Format: https://example.com/image.png
            </div>
          </div>
        ) : (
          <img 
            src={pokemonData.image} 
            alt={pokemonData.name[language]} 
            style={{
              width: "279px",
              height: "203px",
              objectFit: "contain"
            }}
          />
        )}
      </div>

      <div className="headercarte" style={{ backgroundColor: backgroundColor, border: "0px", margin: "0px" }}>
        <div className="informationheader attaque">
          <p style={{ textAlign: "left", flex: 1 }}>Spe Def :</p>
          {isEditing ? (
            <input
              type="number"
              name="spdef"
              value={pokemonData.base["Sp. Defense"] || (pokemonData.base.Sp && pokemonData.base.Sp[" Defense"]) || 0}
              onChange={handleChange} // indique qu on change la valeur et appelle la fonction handleChange
              className="edit-input"
              style={{
                width: "50px",
                textAlign: "right",
                padding: "0",
                border: "none",
                backgroundColor: "transparent",
                fontSize: "inherit",
                fontFamily: "inherit",
                color: "#000000"
              }}
            />
          ) : (
            <p style={{ textAlign: "right" }}>
              {pokemonData.base["Sp. Defense"] || (pokemonData.base.Sp && pokemonData.base.Sp[" Defense"]) || 0}
            </p>
          )}
        </div>
        <div className="informationheader attaque">
          <p style={{ textAlign: "left", flex: 1 }}>Spe Attaque :</p>
          {isEditing ? (
            <input
              type="number"
              name="spattaque"
              value={pokemonData.base["Sp. Attack"] || (pokemonData.base.Sp && pokemonData.base.Sp[" Attack"]) || 0}
              onChange={handleChange}
              className="edit-input"
              style={{
                width: "50px",
                textAlign: "right",
                padding: "0",
                border: "none",
                backgroundColor: "transparent",
                fontSize: "inherit",
                fontFamily: "inherit",
                color: "#000000"
              }}
            />
          ) : (
            <p style={{ textAlign: "right" }}>
              {pokemonData.base["Sp. Attack"] || (pokemonData.base.Sp && pokemonData.base.Sp[" Attack"]) || 0}
            </p>
          )}
        </div>
        <div className="informationheader attaque">
          <p style={{ textAlign: "left", flex: 1 }}>Speed :</p>
          {isEditing ? (
            <input
              type="number"
              name="speed"
              value={pokemonData.base["Speed"]}
              onChange={handleChange}
              className="edit-input"
              style={{
                width: "50px",
                textAlign: "right",
                padding: "0",
                border: "none",
                backgroundColor: "transparent",
                fontSize: "inherit",
                fontFamily: "inherit",
                color: "#000000"
              }}
            />
          ) : (
            <p style={{ textAlign: "right" }}>{pokemonData.base["Speed"]}</p>
          )}
        </div>
        <div className="informationheader attaque">
          <p style={{ textAlign: "left", flex: 1 }}>Attaque :</p>
          {isEditing ? (
            <input
              type="number"
              name="attaque"
              value={pokemonData.base["Attack"]}
              onChange={handleChange}
              className="edit-input"
              style={{
                width: "50px",
                textAlign: "right",
                padding: "0",
                border: "none",
                backgroundColor: "transparent",
                fontSize: "inherit",
                fontFamily: "inherit",
                color: "#000000"
              }}
            />
          ) : (
            <p style={{ textAlign: "right" }}>{pokemonData.base["Attack"]}</p>
          )}
        </div>
      </div>

      <div className="typecarte id" style={{ backgroundColor: '#ffffff', textAlign: 'left' }}>
        <p>{pokemonData.id}/{total}</p>
      </div>

      <div style={{
        position: "absolute",
        bottom: "5px",
        left: "5px",
        display: "flex",
        gap: "5px"
      }}>
        <button 
          className="edit-button"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          style={{
            padding: "4px 8px",
            backgroundColor: isEditing ? "#4CAF50" : "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
            fontSize: "0.8em",
            fontWeight: "normal",
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            transition: "all 0.2s ease",
            opacity: 0.8
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.02)";
            e.target.style.opacity = "1";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.opacity = "0.8";
          }}
        >
          {isEditing ? "Sauvegarder" : (isCreationMode ? "Ajouter" : "Modifier")}
        </button>

        {isEditing && (
          <>
            <button 
              className="edit-button"
              onClick={handleCancel}
              style={{
                padding: "4px 8px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "0.8em",
                fontWeight: "normal",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                transition: "all 0.2s ease",
                opacity: 0.8
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.02)";
                e.target.style.opacity = "1";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.opacity = "0.8";
              }}
            >
              Annuler
            </button>
            
            {/* Bouton Supprimer, visible uniquement si on n'est pas en mode création */}
            {!isCreationMode && (
              <button 
                className="edit-button"
                onClick={handleDelete}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "#FF5722",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "0.8em",
                  fontWeight: "normal",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease",
                  opacity: 0.8
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "scale(1.02)";
                  e.target.style.opacity = "1";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.opacity = "0.8";
                }}
              >
                Supprimer
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  pokemon: PropTypes.object.isRequired,
  ChangeFav: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  onUpdate: PropTypes.func,
  isCreationMode: PropTypes.bool,
  isInitialEditMode: PropTypes.bool
};

export default Header;

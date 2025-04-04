import React, { useState, useEffect } from "react";
import HeaderMenu from '../components/layouts/header/header';
import Header from '../components/layouts/header';
import '../components/layouts/header/carte.css';
import { apiService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Pokemon = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [Cate, setCate] = useState("");
  const [Lang, setLang] = useState("french");
  const [Home, setHome] = useState(false);
  const [Ajout, setAjout] = useState(true);
  const [Fav, setFav] = useState(0);
  const [maxPokemonId, setMaxPokemonId] = useState(0);
  const [isInitialEditMode, setIsInitialEditMode] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const defaultPokemonData = {
    id: 999,
    name: {
      french: "Nouveau Pokémon",
      english: "New Pokemon",
      japanese: "新ポケモン",
      chinese: "新宝可梦"
    },
    type: "Normal",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png", // Image de Pikachu par défaut
    base: {
      "HP": 100,
      "Attack": 50,
      "Defense": 50,
      "Sp. Attack": 50,
      "Sp. Defense": 50,
      "Speed": 50
    },
    favoris: 0
  };

  const [pokemonData, setPokemonData] = useState(() => {
    const savedData = localStorage.getItem('pokemonData');
    return savedData ? JSON.parse(savedData) : defaultPokemonData;
  });

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const id = new URLSearchParams(window.location.search).get('id');
        if (id) {
          const pokemon = await apiService.getPokemonById(id);
          setPokemonData(pokemon);
        } else {
          // Si pas d'ID, on réinitialise avec les données par défaut
          setPokemonData(defaultPokemonData);
        }

        // Récupérer l'ID maximal des Pokémon
        const allPokemons = await apiService.getAllPokemon("", "french", "");
        const maxId = Math.max(...allPokemons.map(pokemon => pokemon.id));
        setMaxPokemonId(maxId);
      } catch (error) {
        console.error("Erreur lors du chargement du Pokémon:", error);
        setPokemonData(defaultPokemonData);
      }
    };

    loadPokemon();
  }, []);

  useEffect(() => {
    localStorage.setItem('pokemonData', JSON.stringify(pokemonData));
  }, [pokemonData]);

  const handleUpdate = (updatedPokemon, isDeleted = false) => {
    if (isDeleted) {
      // Afficher un message de succès pour la suppression
      setShowDeleteMessage(true);
      
      // Rediriger vers la page d'accueil après 2 secondes
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
      return;
    }
    
    // Si ce n'est pas une suppression, mettre à jour les données du Pokémon
    setPokemonData(updatedPokemon);
    
    // Afficher le message de succès pour la mise à jour
    setShowSuccessMessage(true);
    
    // Masquer le message après 3 secondes
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleFavoriteChange = () => {
    setPokemonData(prev => ({
      ...prev,
      favoris: prev.favoris === 1 ? 0 : 1
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.updatePokemon(pokemonData);
      console.log("Nouveau Pokémon créé:", response);
      alert("Pokémon créé avec succès!");
    } catch (error) {
      console.error("Erreur lors de la création du Pokémon:", error);
      alert("Erreur lors de la création du Pokémon");
    }
  };

  // Style pour la popup de succès
  const successMessageStyle = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    opacity: showSuccessMessage ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    pointerEvents: showSuccessMessage ? 'auto' : 'none'
  };

  // Style pour la popup de succès de suppression
  const deleteMessageStyle = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#FF5722',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    opacity: showDeleteMessage ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    pointerEvents: showDeleteMessage ? 'auto' : 'none'
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
      
      {/* Message de succès pour ajout/modification */}
      <div style={successMessageStyle}>
        Pokémon ajouté avec succès !
      </div>
      
      {/* Message de succès pour suppression */}
      <div style={deleteMessageStyle}>
        Pokémon supprimé avec succès ! Redirection...
      </div>
      
      <div className="container" style={{ marginTop: '30px' }}>
        <Header 
          pokemon={pokemonData}
          language={Lang}
          ChangeFav={handleFavoriteChange}
          isFavorite={pokemonData.favoris === 1}
          total={maxPokemonId}
          onUpdate={handleUpdate}
          isCreationMode={true}
          isInitialEditMode={isInitialEditMode}
        />
      </div>
    </div>
  );
};

export default Pokemon; 
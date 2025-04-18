import React, { useState, useEffect } from "react";
import HeaderMenu from '../components/layouts/navigation/header';
import Header from '../components/layouts/header';
import { apiService } from '../services/api';


const Menu = () => {
  const [search, setSearch] = useState("");
  const [Cate, setCate] = useState("");
  const [Lang, setLang] = useState("french");
  const [pokelist, setpokelist] = useState([]);
  const [currentPage, setCurrentPage] = useState(true);
  const [Fav, setFav] = useState(0);
  const [maxId, setMaxId] = useState(0);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      // Charger tous les Pokémon une fois pour déterminer l'ID maximal
      const allData = await apiService.getAllPokemon("", "french", "");
      if (allData && allData.length > 0) {
        const maxPokemonId = Math.max(...allData.map(pokemon => pokemon.id));
        setMaxId(maxPokemonId);
      }
    };
    fetchAllPokemons();
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      const data = await apiService.getAllPokemon(search, Lang, Cate);
      setpokelist(data);
      console.log("Pokémon chargés:", data);
    };
    fetchPokemons();
  }, [search, Lang, Cate]);

  // Fonction pour obtenir l'ID maximal des Pokémon
  const getMaxPokemonId = () => {
    return maxId;
  };

  const handleFavoriteChange = async (pokemonId) => {
    try {
      // Logique pour gérer le changement de favori
      // Par exemple, appeler une API pour mettre à jour le statut de favori
      const updatedPokemon = await apiService.updateFavoriteStatus(pokemonId);
      // Mettez à jour l'état local si nécessaire
    } catch (error) {
      console.error("Erreur lors de la mise à jour du favori:", error);
    }
  };

  const favorisPokemons = pokelist.filter(pokemon => pokemon.favoris === 1);
  console.log("Pokémon favoris:", favorisPokemons);

  return (
    <div>
      <div className="container">
      <HeaderMenu verif={setSearch} verif2={setCate} verif3={setLang}  verif4={setFav}verif5={setCurrentPage} verif6={setFav}
      />
      {currentPage === "false" ? (
        <>
          {favorisPokemons.length > 0 ? (
            [...favorisPokemons]
              .sort((a, b) => a.id - b.id)
              .map(pokemon => (
                <Header 
                  key={pokemon.id} 
                  pokemon={pokemon}
                  language={Lang}
                  ChangeFav={() => handleFavoriteChange(pokemon.id)}
                  isFavorite={pokemon.favoris === 1}
                  total={getMaxPokemonId()}
                />
              ))
          ) : (
            <p>Aucun Pokémon favori trouvé.</p>
          )}
        </>
      ) : null} 
      </div>
    </div>
  );
};

export default Menu; 
import { useState, useEffect} from "react";
import HeaderMenu from '../components/layouts/header/header';
import Header from '../components/layouts/header';
import '../components/layouts/header/carte.css';
import '../components/layouts/header/nav.css';
import routes from "../config/routes";
import { apiService } from "../services/api";
import '../App.css';

function App() {

  const [search, setSearch] = useState("");
  const [Cate, setCate] = useState("");
  const [Lang, setLang] = useState("french");
  const [Home, setHome] = useState(true);
  const [Ajout, setAjout] = useState(true);
  const [pokelist, setPokelist] = useState([]);
  const [Fav,setFav]= useState(0);
  const [maxId, setMaxId] = useState(0);
  // const [filter, setFilter] = useState
  // const [pokemonsFavoris, setPokemonsFavoris] = useState(Tous); // Stockage de tous les pokemons avec leur état favoris



  useEffect(()=>{
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

  useEffect(()=>{
    const getpokemons = async()=>{
      const pl=await apiService.getAllPokemon(search,Lang,Cate); ///on récupère les pokemons
      setPokelist(pl);
  
    }
    getpokemons();
    
  },[search, Lang, Cate]);
  
  // Fonction pour obtenir l'ID maximal des Pokémon
  const getMaxPokemonId = () => {
    return maxId;
  };

  // const handleFavoriteChange = async (pokemonId, isDeleted = false) => {
  //   try {
  //     // Si le Pokémon a été supprimé, le retirer de la liste
  //     if (isDeleted) {
  //       setPokelist(prevList => prevList.filter(p => p.id !== pokemonId));
  //       return;
  //     }
      
  //     // Sinon, mettre à jour le statut de favori comme avant
  //     const pokemonToUpdate = pokelist.find(p => p.id === pokemonId);
  //     if (pokemonToUpdate) {
  //       const updatedPokemon = {
  //         ...pokemonToUpdate,
  //         favoris: pokemonToUpdate.favoris === 1 ? 0 : 1
  //       };
  //       await apiService.updatePokemon(updatedPokemon);
        
  //       // Mettre à jour la liste locale
  //       setPokelist(prevList => 
  //         prevList.map(p => 
  //           p.id === pokemonId ? updatedPokemon : p
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de la mise à jour des favoris:", error);
  //   }
  // };

  const choixPokemonspasfav = pokelist.filter((pokemon) =>
    pokemon.favoris !== 0
  );

  return (
    <div>
      <div className="container">
        <HeaderMenu verif={setSearch} verif2={setCate} verif3={setLang} verif5={setHome} verif6={setAjout} verif4={setFav} />
        {
            Home ? 
            [...pokelist]
              .sort((a, b) => a.id - b.id)
              .map((pokemon) => (
                <Header 
                  key={pokemon.id} 
                  pokemon={pokemon}
                  language={Lang}
                  ChangeFav={() => handleFavoriteChange(pokemon.id)}
                  isFavorite={pokemon.favoris === 1}
                  total={getMaxPokemonId()}
                />
              )) 
            : 
            [...choixPokemonspasfav]
              .sort((a, b) => a.id - b.id)
              .map((pokemon) => (
                <Header 
                  key={pokemon.id} 
                  pokemon={pokemon}
                  language={Lang}
                  ChangeFav={() => handleFavoriteChange(pokemon.id)}
                  isFavorite={pokemon.favoris === 1}
                  total={getMaxPokemonId()}
                />
              )
            )
        }
      </div>
    </div>
  );
}

export default App;

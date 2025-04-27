import { useState, useEffect} from "react";
import HeaderMenu from '../components/layouts/navigation/header';
import Header from '../components/layouts/header';
import '../components/layouts/header/carte.css';
import '../components/layouts/navigation/nav.css';
import routes from "../config/routes";
import { apiService } from "../services/api";
import '../App.css';
import { useNavigate } from "react-router-dom";
function App() {

  const [search, setSearch] = useState("");
  const [Cate, setCate] = useState("");
  const [Lang, setLang] = useState("french");
  const [Home, setHome] = useState(true);
  const [Ajout, setAjout] = useState(true);
  const [pokelist, setPokelist] = useState([]);
  const [Fav,setFav]= useState(0);
  const [maxId, setMaxId] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchAllPokemons = async () => {
      // Charger tous les Pokémon une fois pour déterminer l'ID maximal
      const allData = await apiService.getAllPokemon("", "french", "",navigate);
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

  

  const choixPokemonspasfav = pokelist.filter((pokemon) =>
    pokemon.favoris !== 0
  );

  const handleFavoriteChange = async (pokemonId) => {
    try {
      // Logique pour gérer le changement de favori
      const response = await fetch(`/api/pokemons/${pokemonId}/favorite`, {
        method: 'PUT', // ou 'POST' selon votre API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorite: true }), // ou false selon le cas
      });
      // Mettez à jour l'état local si nécessaire
      // Par exemple, vous pouvez mettre à jour le pokelist ou un autre état
    } catch (error) {
      console.error("Erreur lors de la mise à jour du favori:", error);
    }
  };

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

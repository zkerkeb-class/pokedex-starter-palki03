import { useState } from "react";
import Header from './Component/header';
import pokemons from './assets/pokemons';
import './App.css';
import HeaderMenu from './Component/header/header';
import './Component/header/carte.css';
import './Component/header/nav.css';

// Ajout d'un état pour stocker les favoris
const Tous = pokemons.map(pokemon => ({
  ...pokemon,
  favoris: 0  // Ajout du champ favoris initialisé à 0
}));

function App() {
  const [search, setSearch] = useState("");
  const [Cate, setCate] = useState("");
  const [Lang, setLang] = useState("french");
  const [Home, setHome] = useState(true);
  const [pokemonsFavoris, setPokemonsFavoris] = useState(Tous); // Stockage de tous les pokemons avec leur état favoris

  const LesFavoris = (id) => {
    setPokemonsFavoris(prevPokemons => 
      prevPokemons.map(pokemon => 
        pokemon.id === id ? { ...pokemon, favoris: pokemon.favoris === 1 ? 0 : 1 } : pokemon
      )
    );
  };

  // Filtrer les Pokémon selon la recherche (insensible à la casse)
  const choixPokemons = pokemonsFavoris.filter((pokemon) =>
    pokemon.name[Lang]?.toUpperCase().includes(search.toUpperCase())
  );

  // Filtrer selon le type sélectionné
  const choixPokemons2 = choixPokemons.filter((pokemon) =>
    pokemon.type.some((type) => type.toUpperCase().includes(Cate.toUpperCase()))
  );

  const choixPokemonspasfav = choixPokemons2.filter((pokemon) =>
    pokemon.favoris !== 0
  );

  return (
    <div>
      <div className="container">
        <HeaderMenu verif={setSearch} verif2={setCate} verif3={setLang} verif5={setHome} />
        {
            Home ?        
            choixPokemons2.map((pokemon) => (
          <Header 
            key={pokemon.id} 
            id={pokemon.id} 
            total={Tous.length}
            nom={pokemon.name[Lang]} 
            image={pokemon.image}
            typei={pokemon.type}
            spattaque={pokemon.base['Sp. Attack']}
            hp={pokemon.base['HP']}
            spdef={pokemon.base['Sp. Defense']}
            attaque={pokemon.base['Attack']}
            speed={pokemon.base['Speed']}
            type={pokemon.type.join(', ')}
            verif4={LesFavoris}  // Passer la fonction toggleFavoris
            favoris={pokemon.favoris}
          />)) :     choixPokemonspasfav.map((pokemon) => (
            <Header 
              key={pokemon.id} 
              id={pokemon.id} 
              total={Tous.length}
              nom={pokemon.name[Lang]} 
              image={pokemon.image}
              typei={pokemon.type}
              spattaque={pokemon.base['Sp. Attack']}
              hp={pokemon.base['HP']}
              spdef={pokemon.base['Sp. Defense']}
              attaque={pokemon.base['Attack']}
              speed={pokemon.base['Speed']}
              type={pokemon.type.join(', ')}
              verif4={LesFavoris}  // Passer la fonction toggleFavoris
              favoris={pokemon.favoris}
            /> 


        ))}
      </div>
    </div>
  );
}

export default App;

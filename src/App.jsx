import { useState } from "react";
import Header from './Component/header';
import pokemons from './assets/pokemons';
import './App.css';
import HeaderMenu from './Component/header/header';

const Tous = pokemons;

function App() {
  const [search, setSearch] = useState("");
  const [Cate, setCate] = useState("");
  const [Lang, setLang] = useState("french");

  // Filtrer les Pokémon selon la recherche (insensible à la casse)
  const choixPokemons = Tous.filter((pokemon) =>
    pokemon.name[Lang]?.toUpperCase().includes(search.toUpperCase())
  );
  
  // Filtrer selon le type sélectionné
  const choixPokemons2 = choixPokemons.filter((pokemon) =>
    pokemon.type.some((type) => type.toUpperCase().includes(Cate.toUpperCase()))
  );

  return (
    <div>
      <div className="container">
        <HeaderMenu verif={setSearch} verif2={setCate} verif3={setLang} />
      </div>

      <div className="container">
        {choixPokemons2.map((pokemon) => (
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
          />
        ))}
      </div>
    </div>
  );
}

export default App;

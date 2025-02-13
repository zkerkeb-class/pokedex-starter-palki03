
import Header from './Component/header';
import pokemons from './assets/pokemons';

import './App.css';


const Tous = pokemons;

function App() {
  return (
    <div>
      <nav>
          <a href="#" className="nav-item is-active">Home</a>
          <a href="#" className="nav-item">Langage</a>
          <a href="#" className="nav-item">Recherche</a>
          <input type="text" className="Nav-item" placeholder="Rechercher..." />
          <button className="Nav-item">🔍</button>
      </nav>
      

      
      <div className="container">
        {/* Utilisation de map pour afficher tous les Pokémon du tableau */}
        {Tous.map((pokemon) => (
          <Header 
            key={pokemon.id} 
            id={pokemon.id} 
            total={Tous.length}
            nom={pokemon.name.french} 
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

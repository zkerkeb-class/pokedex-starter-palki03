const url = 'http://localhost:3000/api/pokemons';
const userUrl = 'http://localhost:3000/api/users';
import axios from "axios";

export const apiService = {
  
  getAllPokemon: async (name, lang, categorie,navigate) => {  // Ajout des paramètres "lang" et "name"
    const user= JSON.parse(localStorage.getItem('user'));
    const token=user.token;
    console.log(token);
    console.log("bonjur");
    try {
      const response = await axios.get(`${url}/?searchname=${name}&lang=${lang}&categorie=${categorie}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(name, lang, categorie); // Utilisation de `await` pour récupérer la réponse
      console.log("Structure du premier Pokémon:", response.data[0]); // Affiche la structure du premier Pokémon
      console.log("Stats de base du premier Pokémon:", response.data[0]?.base); // Affiche les stats de base
      return response.data;  // Retourne les données pour les utiliser ailleurs
    } catch (error) {
      console.error("Erreur API", error);
      if(error.response.status === 401){

        ///navigate('/');
        }
      throw error;
    }
  },

  // Trouve le plus petit ID disponible (supérieur à 0)
  minId: async () => {
    try {
      // Récupérer tous les Pokémon
      const allPokemons = await apiService.getAllPokemon("", "french", "");
      
      // Extraire tous les IDs existants
      const existingIds = allPokemons.map(pokemon => pokemon.id).sort((a, b) => a - b);
      
      console.log("IDs existants:", existingIds);
      
      // Trouver le plus petit ID disponible > 0
      let smallestId = 1;
      
      for (const id of existingIds) {
        if (id === smallestId) {
          smallestId++;
        } else if (id > smallestId) {
          // Nous avons trouvé un trou dans la séquence
          break;
        }
      }
      
      console.log("Plus petit ID disponible:", smallestId);
      return smallestId;
    } catch (error) {
      console.error("Erreur lors de la recherche du plus petit ID disponible:", error);
      // En cas d'erreur, retourner un ID par défaut élevé
      return 9999;
    }
  },

  getPokemonById: async (id) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération du Pokémon", error);
      throw error;
    }
  },

  createPokemon: async (pokemonData) => {
    try {
      // Trouver le plus petit ID disponible
      const newId = await apiService.minId();
      const user= JSON.parse(localStorage.getItem('user'));
      const token=user.token;
      console.log(token);
      console.log("bonjusssr");
      console.log(token.email);
      
      const dataToSend = {
        id: newId, // Utiliser le plus petit ID disponible
        name: pokemonData.name,
        type: pokemonData.type,
        image: pokemonData.image,
        base: pokemonData.base,
        favoris: pokemonData.favoris || 0
      };

      console.log("Données envoyées à l'API pour création:", dataToSend);
      const response = await axios.post(url, dataToSend,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 201) {
        console.log("Pokémon créé avec succès:", response.data);
        return response.data;
      } else {
        throw new Error("Erreur lors de la création du Pokémon");
      }
    } catch (error) {
      console.error("Erreur lors de la création du Pokémon", error);
      throw error;
    }
  },

  updatePokemon: async (pokemonData) => {
    try {
      // S'assurer que toutes les données sont présentes
      const dataToSend = {
        id: pokemonData.id,
        name: pokemonData.name,
        type: pokemonData.type,
        image: pokemonData.image,
        base: pokemonData.base,
        favoris: pokemonData.favoris || 0
      };

      console.log("Données envoyées à l'API:", dataToSend);
      const response = await axios.put(`${url}/${pokemonData.id}`, dataToSend);
      
      // Vérifier si la réponse est réussie
      if (response.status === 200) {
        console.log("Pokémon mis à jour avec succès:", response.data);
        return response.data;
      } else {
        throw new Error("Erreur lors de la mise à jour du Pokémon");
      }
    } catch (error) {
      console.error("Erreur lors de la modification du Pokémon", error);
      throw error;
    }
  },
  
  deletePokemon: async (id) => {
    try {
      if (!id) {
        console.error("ID invalide pour la suppression:", id);
        throw new Error("ID invalide pour la suppression");
      }
      
      console.log("Tentative de suppression du Pokémon avec l'ID:", id);
      console.log("URL complète:", `${url}/${id}`);
      
      const response = await axios.delete(`${url}/${id}`);
      
      console.log("Réponse du serveur:", response);
      
      if (response.status === 200 || response.status === 204) {
        console.log("Pokémon supprimé avec succès");
        return true;
      } else {
        console.error("Erreur lors de la suppression, statut:", response.status);
        throw new Error(`Erreur lors de la suppression du Pokémon. Statut: ${response.status}`);
      }
    } catch (error) {
      console.error("Erreur détaillée lors de la suppression du Pokémon:", error);
      
      if (error.response) {
        // La requête a été faite et le serveur a répondu avec un statut d'erreur
        console.error("Réponse du serveur:", error.response.data);
        console.error("Statut:", error.response.status);
        console.error("En-têtes:", error.response.headers);
        throw new Error(`Erreur du serveur: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        console.error("Aucune réponse reçue:", error.request);
        throw new Error("Aucune réponse reçue du serveur");
      } else {
        // Une erreur s'est produite lors de la configuration de la requête
        console.error("Erreur de configuration:", error.message);
        throw error;
      }
    }
  },
  getUser: async (email, password) => {
    try {
      // Effectuer une requête GET pour l'authentification
      const response = await axios.post(`${userUrl}/login`, { email, password });

      return response.data;
    } catch (error) {
      console.log(error);
      
      // Gestion des erreurs
      if (error.response) {
        throw new Error(`Erreur d'authentification: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        throw new Error("Le serveur ne répond pas");
      } else {
        throw new Error(`Erreur inconnue: ${error.message}`);
      }
    }
  },
  
  createUser: async (email, password) => {
    console.log(email, password);
    try {
      const response = await axios.post(`${userUrl}/create`, {
      email, 
      password
      });
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la vérification de l'utilisateur: ${error.message}`);
    }
  },

  giveCard: async (email, cardId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user')); // Récupérer l'utilisateur du localStorage
      const token = user ? user.token : null; // Récupérer le token

      const response = await axios.post(`${url}/giveCard`, { email, cardId }, {
        headers: {
          'Authorization': `Bearer ${token}` // Ajouter l'en-tête Authorization
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la tentative de donner une carte", error);
      throw error;
    }
  },
};

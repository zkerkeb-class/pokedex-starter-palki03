# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Ce projet est le projet de Alexandre Chanzy

Qu'a apporté le jeu dans mon projet ?

Tout d'abord pour envoyer une carte j'ai du ajouter une page ("Jeu")
Ensuite une fois connectée a la page Jeu j'ai une interface me permettant d'indiquer un mail et un numéro de carte.
J'ai donc du ajouter le parametre dresseur aux cartes pour savoir a qui appartient la carte.
De plus l'id de carte n'est plus unique car chaque joueur a sa premiere carte a 1.
Cela permet d'envoyer la carte. Il fallait s'assurer que :
    - l'email d'une personne existait
    - le numéro de la carte est bien présent dans les cartes du dresseur.

l'id n'étant plus unique j'ai du modifier toutes les requetes API.

Pour modifier il fallait verifier :
    - la carte appartient au dresseur du token ?
    - la carte a le meme numéro que celui indiqué ?
on recupere l'objectid et on modifie en fonction de l'objectid

Pour la suppression et l'envoie il faut faire de meme .
Chaque api devait etre verifiée par le middleware et pour chaque outil il était nécessaire d'analyser le token pour verifier l'identité du joueur.
A cela l'envoie d'une carte ne prend pas l'id d'une carte déja existante chez un joueur.
En conséquence l'id est adaptative elle prend la plus petite valeur disponible possible sur le moment.

En conclusion le jeu m'a surtout fait manipuler la base de données les tokens et modifier chaque requetes API.

Projet de Alexandre Chanzy ing4 Cybergroup 1
🧠 Structure du projet
lien video youtube
https://youtu.be/srvgj6NtER0

📦 backend/
 ┣ 📂model/            → Schémas Mongoose (`user.js`, `Pokemon.js`)
 ┣ 📂routes/           → Routes Express (`pokemonroutes.js`, `userroute.js`)
 ┣ 📂middleware/       → Middleware d'authentification JWT (`loginware.js`)
 ┣ 📜db.js             → Connexion à la base de données MongoDB
 ┣ 📜server.js         → Point d'entrée du serveur

⚙️ Installation
   1. Prérequis
   Node.js installé
   Docker installé (pour la base MongoDB)
   2. Lancer la base de données
   docker run --name mongo-pokemon -p 27017:27017 -d mongo
      git clone <url_backend&urlfrontend>
      cd backend et cd frontend
      npm install
      npm run dev

🔐 Authentification
Toutes les routes (sauf /create et /login) sont protégées par token JWT via le middleware auth.

Ajoutez ce header à vos requêtes :
Authorization: Bearer <token>

📚 Routes API

🔑 Authentification
   ✅ POST /create
      Créer un utilisateur.
         Body :
         {
            "email": "exemple@mail.com",
            "password": "motdepasse"
         }


   ✅ POST /login
      Connexion d’un utilisateur, retourne un token JWT.

         Body :
         {
            "email": "exemple@mail.com",
            "password": "motdepasse"
         }
         Réponse :
         {
            "message": "Connexion réussie",
            "token": "<jwt_token>"
         }

📦 Pokémon
Toutes les routes ci-dessous nécessitent un token JWT valide.

   🔍 GET /pokemons
      Permet de lister les cartes Pokémon appartenant à l’utilisateur connecté, avec filtres :
      searchname: nom à chercher (optionnel)
      lang: langue pour le nom (french, english, etc.)
      categorie: type de Pokémon (ex: Fire, Water...)

      Exemple : GET /pokemons?searchname=draco&lang=french&categorie=dragon

   ➕ POST /pokemons
      Créer une carte Pokémon :
         Body :
         {
         "id": 150,
         "name": "Mewtwo",
         "type": ["Psychic"],
         "base": {
            "HP": 100,
            "Attack": 150,
            "Defense": 90,
            "Sp": {
               " Attack": 180,
               " Defense": 120
            }
         }
         }
      💡 Le champ name sera automatiquement dupliqué dans toutes les langues.


   ✏️ PUT /pokemons/:id/:lang
      Met à jour les données d’un Pokémon (nom dans une langue donnée, stats, etc.).
      Exemple : PUT /pokemons/150/french
         Body :
         {
            "name": {
               "french": "Mewtwo Modifié"
            },
            "base": {
               "HP": 120
            }
         }

   ❌ DELETE /pokemons/:id
      Supprime une carte Pokémon de l’utilisateur.

   🎁 BONUS : Transfert de cartes
      🔁 POST /pokemons/giveCard
      Permet de transférer une carte Pokémon à un autre utilisateur.

         Body :
         {
            "email": "destinataire@mail.com",
            "cardId": 150
         }
   

✅ Exemple de réponse de succès
   {
      "message": "Carte transférée avec succès.",
      "card": {
         "id": 3,
         "name": {
            "english": "Bulbasaur",
            "french": "Bulbizarre",
            ...
         },
         "type": ["Grass", "Poison"],
         "dresseur": ["nouveau@mail.com"]
      }
   }


   

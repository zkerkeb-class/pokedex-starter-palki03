
import './HeaderMenu.css'; // Optionnel, si tu veux ajouter un peu de style CSS

const HeaderMenu = () => {
  return (
    <header className="header-menu">
      <nav>
        <ul>
          <li><a href="#home">Accueil</a></li>
          <li><a href="#about">À propos</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderMenu;
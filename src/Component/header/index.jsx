// eslint-disable-next-line react/prop-types
import PropTypes from "prop-types"
const Header = ({ nom, image, type, attaque,spattaque,spdef,hp,speed,id,total}) => {
    return (
        <div className="pokemon-card">
            
        <div className="headercarte">
            <div className="informationheader" >
                <h>{nom}</h>  
                <h>HP : {hp}</h> 
            </div>
        </div>
        
        <div className="headercarte img" style={{ backgroundColor: "#ffffff", border: "5px solid #edc131"}}>
            <div className="typecarte" style={{ position: "absolute", right: "4%", top:"15%" }}>{type}</div>
            <img src={image} alt={nom} /></div>
            <div className="headercarte"  >
                <p>Spe Def : {spdef}</p>
                <p>Spe Attaque : {spattaque}</p>
                <p>Speed : {speed}</p>
                <p>Attaque : {attaque}</p>
            </div>  
        <div className="typecarte id" style={{ backgroundColor: '#ffffff' }}>
                <p>{id}/{total}</p>
            </div>
        </div>
    );
};
Header.propTypes = {
    nom: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    attaque: PropTypes.number.isRequired,
    spattaque: PropTypes.number.isRequired,
    spdef: PropTypes.number.isRequired,
    hp: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    typei: PropTypes.number.isRequired
};

export default Header;



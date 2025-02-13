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
            <div className="headercarte" style={{ backgroundColor: "#cf7f7f", border:"0px" }} >
                <div className="informationheader" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <p style={{ textAlign: "left", flex: 1 }}>Spe Def :</p>
                    <p style={{ textAlign: "right" }}>{spdef}</p>
                </div>
                <div className="informationheader" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <p style={{ textAlign: "left", flex: 1 }}>Spe Attaque :</p>
                    <p style={{ textAlign: "right" }}>{spattaque}</p>
                </div>
                <div className="informationheader" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <p style={{ textAlign: "left", flex: 1 }}>Speed :</p>
                    <p style={{ textAlign: "right" }}>{speed}</p>
                </div>
                <div className="informationheader" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <p style={{ textAlign: "left", flex: 1 }}>Attaque :</p>
                    <p style={{ textAlign: "right" }}>{attaque}</p>
                </div>
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



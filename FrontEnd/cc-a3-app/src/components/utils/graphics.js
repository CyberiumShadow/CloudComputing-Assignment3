import "./utils.css";
import CarRent from "./car-rent.jpg";

function Graphics() {
  return (
    <div>
      <div className="landing-container">
        <div>
          <h1 className="brand">NeoCar</h1>
          <h2 className="tagline">make trips better</h2>
        </div>
        <img className="car-rent-img" src={CarRent} alt="car rent"></img>
      </div>
    </div>
  );
}

export default Graphics;
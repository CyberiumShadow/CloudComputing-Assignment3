import "./utils.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

function LoadingButtonOutline(props) {
  return !props.isLoading ? (
    <div>
      <button type="submit" className={`loading-btn-outline ${props.disabled ? "btn-disabled" : ""}`} disabled={props.disabled}>
        {props.text}
      </button>
    </div>
  ) : (
    <div>
      <button type="submit" className="loading-btn-outline loading" disabled={true}>
        {props.loadingText} <FontAwesomeIcon icon={faCircleNotch} size="sm" className="spinner" /> 
      </button>
    </div>
  )
}

export default LoadingButtonOutline;
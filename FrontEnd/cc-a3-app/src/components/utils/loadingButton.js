import "./utils.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

function LoadingButton(props) {
  return !props.isLoading ? (
    <div>
      <button type="submit" className={`loading-btn ${props.disabled ? "btn-disabled" : ""}`} disabled={props.disabled}>
        {props.text}
      </button>
    </div>
  ) : (
    <div>
      <button type="submit" className="loading-btn loading" disabled={true}>
        Loading <FontAwesomeIcon icon={faCircleNotch} size="sm" className="spinner" /> 
      </button>
    </div>
  )
}

export default LoadingButton;
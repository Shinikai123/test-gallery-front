import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
    return(
        <div className="not_found_background">
            <div className="not_found_description">
                Oops,the page you are looking for get lost.
            </div>
            <Link to="/">
                <button className="not_found_button">Go back home</button>
            </Link>
        </div>
    )
}

export default NotFound;
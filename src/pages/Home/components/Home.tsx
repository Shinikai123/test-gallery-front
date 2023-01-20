import { Link } from "react-router-dom";
import Header from "../../../shared/Header/index";
import "./Home.css"

const Home = () => {
    return (<div>
        <Header/>
        <div className="home_wrapper">
            <div className="home_text">
                <h1 className="home_title">Just grab your camera and shoot videos</h1>
                <div className="home_description">
                        In Moviegram you can add, share and rate different videos from all over the world. 
                        Also you can change the level of access for other users.
                        It’s a test project from Innowise.
                        So let’s get started!
                </div>
                <Link to="/login">
                    <button className="home_button_start"> Start</button>
                </Link>
                
                
            </div>
            <p className="copyright"> Innowise 2023 | Andrew Mihaylov</p>
        </div>
    </div>
        
    )
}

export default Home;
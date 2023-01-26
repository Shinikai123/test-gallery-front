import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from 'react-router-dom';
import Image from "../../../assets/avatar.png";
import { schemaRegistration } from '../../../schemas/schemaRegistration';
import { RegisterUser } from '../../../interfaces/RegisterUser';
import "./Signup.css"

const Signup = () => {
    useEffect(() => {
        const getAPI = () => {
            const API = 'localhost:8000/';

            fetch(API)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setLoading(false);
                setApiData(data);
            });
        };
        getAPI();
    }, []);
    const [apiData ,setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    return (
        <div className='signup_container'>
            <div className='signup_background'>
            </div>
            <div className='signup_side_page'>
            <div>
                    <img className="signup_image" src={Image}></img>
                </div>
                <p className='signup_title'>
                    Sign Up
                </p>
                <form method ="POST" action="localhost:8000/users/registration" className='signup_form'>
                    <input id="user_name" className="input_string" type="text" placeholder="Nickname" required>
                    </input>
                    <input id="user_email" className="input_string" type="text" placeholder="Email address" required>
                    </input>
                    <input id="password" className="input_string" type="password" placeholder="Password" required>
                    </input>
                    <input id="confirmPassword" className="input_string" type="password" placeholder="Confirm Password" required>
                    </input>
                    <div className='rem_button'>
                        <input type="checkbox" id="remember"></input>
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <input className="submit_button" type="submit" value="Sign Up"></input>
                </form>
                <p className='signup_copyright'>
                    Innowise {new Date().getFullYear()} |  <a href="https://github.com/Shinikai123"> Andrew Mihaylov</a>
                </p>
            </div>
        </div>
    )
}

export default Signup;
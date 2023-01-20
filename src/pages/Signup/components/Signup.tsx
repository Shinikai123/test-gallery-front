import React from 'react';
import { Link } from 'react-router-dom';
import Image from "../../../assets/avatar.png"
import "./Signup.css"

const Signup = () => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            nickname: data.get('nickname'),
            email: data.get('email'),
            password: data.get('password')
        });
    };

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
                <form noValidate onSubmit={handleSubmit} className='signup_form'>
                    <input name="nickname" id="nickname" className="input_string" type="text" placeholder="Nickname" required>
                    </input>
                    <input name="email" id="email" className="input_string" type="text" placeholder="Email address" required>
                    </input>
                    <input name="password" id="password" className="input_string" type="password" placeholder="Password" required>
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
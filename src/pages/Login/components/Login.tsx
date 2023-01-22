import React, {useState} from 'react';
import { LoginUser } from '../../../interfaces/LoginUser';
import { schemaLogin } from '../../../schemas/schemaLogin';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from 'react-router-dom';
import Image from "../../../assets/avatar.png"
import "./Login.css"

const Login = () => {

    const {
      register,
      handleSubmit
    } = useForm<LoginUser>({
      resolver: yupResolver(schemaLogin),
    });
    const onSubmit = (data) => {
        console.log(data);
    };
    
    return (
        <div className='login_container'>
            <div className='login_background'>
            </div>
            <div className='login_side_page'>
            <div>
                    <img className="login_image" src={Image}></img>
                </div>
                <p className='login_title'>
                    Sign In
                </p>
                <form noValidate onSubmit={handleSubmit(onSubmit)} className='login_form'>
                    <input name="email" id="email" className="input_string" type="text" placeholder="Email address" required {...register("email")}>
                    </input>
                    <input name="password" id="password" className="input_string" type="password" placeholder="Password" required {...register("password")}>
                    </input>
                    <div className='rem_button'>
                        <input type="checkbox" id="remember"></input>
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <input className="submit_button" type="submit" value="Sign In"></input>
                </form>
                <Link to="/signup">
                    <p>
                        Don't have an account? Sign up now
                    </p>
                </Link>
                
                <p className='login_copyright'>
                    Innowise {new Date().getFullYear()} |  <a href="https://github.com/Shinikai123"> Andrew Mihaylov</a>
                </p>
            </div>
        </div>
    )
}

export default Login;
import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from 'react-router-dom';
import Image from "../../../assets/avatar.png";
import { schemaRegistration } from '../../../schemas/schemaRegistration';
import { RegisterUser } from '../../../interfaces/RegisterUser';
import "./Signup.css"

const Signup = () => {
    const {
        register,
        handleSubmit
      } = useForm<RegisterUser>({
        resolver: yupResolver(schemaRegistration),
      });
      const onSubmit = (data) => {
        console.log(data);
    }
    
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
                <form noValidate onSubmit={handleSubmit(onSubmit)} className='signup_form'>
                    <input id="nickname" className="input_string" type="text" placeholder="Nickname" {...register("nickName")}>
                    </input>
                    <input id="email" className="input_string" type="text" placeholder="Email address" {...register("email")}>
                    </input>
                    <input id="password" className="input_string" type="password" placeholder="Password" {...register("password")}>
                    </input>
                    <input id="confirmPassword" className="input_string" type="password" placeholder="Confirm Password" {...register("confirmPassword")}>
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
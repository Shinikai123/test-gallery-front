import React, {useState, useEffect, FC} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from 'react-router-dom';
import Image from "../../../assets/avatar.png";
import { schemaRegistration } from '../../../schemas/schemaRegistration';
import { IRegisterUser} from '../../../store/types/RegisterUser';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import authService from '../../../services/authService';
import { loginUser } from '../../../store/reducers/authSlice';
import "./Registration.css"
import { IUser } from '../../../interfaces/User';

type Props = {
    avatar: IUser[];
    setAvatar: (IUser: IUser[]) => void;
}

const Registration : FC<any> = ({avatar, setAvatar}) => {


    useEffect(() => {
      const isLoggedLocalStorage = JSON.parse(
        localStorage.getItem("isLogged") as string
      );
  
      if (isLoggedLocalStorage) {
        navigate("/");
      }
    }, []);
  
    const {error} = useAppSelector((state) => state.auth);
    const [err, setErr] = useState(error);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const 
    {register, handleSubmit, formState: {errors},} = 
    useForm<IRegisterUser>({resolver: yupResolver(schemaRegistration),
    });
    const onSubmit = async (data) => {
        setIsLoading(true);
        const {user_name, user_email, password, avatar} = data;
        try {
            const response = await authService.registerUser({
                user_name, user_email, password,
            });
            if(!response.error) {
                localStorage.setItem("token", response.accessToken);
                localStorage.setItem("isLogged", "true")
                dispatch(loginUser(data));
                navigate(`/profile/${response.id}`);
            } else {
                setErr (response.error);
            }
        } catch (e : any) {
            console.log(e.error)
            setErr(e.error);
        } finally {
            setIsLoading(false);
        }
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
                <form onSubmit={handleSubmit(onSubmit)} action='/register' className='signup_form'>
                    <input  className="input_string" type="text" placeholder="Nickname" required {...register('user_name')}>
                    </input>
                    <input  className="input_string" type="text" placeholder="Email address" required {...register('user_email')}>
                    </input>
                    <input className="input_string" type="text" placeholder="Password" required {...register('password')}>
                    </input>
                    <label>The required password length must be between 6 and 40 characters</label>
                    <input  className="input_string" type="text" placeholder="Confirm Password" required {...register('confirmPassword')}>
                    </input>
                    <input className="submit_button" type="submit" value="Sign Up"></input>
                </form>
                <Link to="/login">Have an account? Just sign in</Link>
                <p className='signup_copyright'>
                    Innowise {new Date().getFullYear()} |  <a href="https://github.com/Shinikai123"> Andrew Mihaylov</a>
                </p>
            </div>
        </div>
    )
}

export default Registration;
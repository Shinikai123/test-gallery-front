import React, {useState, useEffect, FC} from 'react';
import { useForm } from 'react-hook-form';
import { ILoginUser } from '../../../store/types/LoginUser';
import { schemaLogin } from '../../../schemas/schemaLogin';
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from 'react-router-dom';
import Image from "../../../assets/avatar.png";
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import authService from '../../../services/authService';
import { loginUser } from '../../../store/reducers/authSlice';
import "./Login.css"

const Login: FC = () => {
    const {error} = useAppSelector((state) => state.auth);
    const [err, setErr] = useState(error);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setErr(error);
    }, [error]);

    const 
    {register, handleSubmit, formState: {errors},} =
        useForm<ILoginUser>({
            resolver: yupResolver(schemaLogin),
        });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try{
            const response = await authService.loginUser(data);

            if(!response.error) {
                localStorage.setItem("token", response.accessToken);
                localStorage.setItem("isLogged", "true");
                
                
                await dispatch(loginUser(data));
                
                   
                navigate(`/profile/${response.id}`);
            } else {
                setErr(response.error);
            }
        } catch(e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

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
                <form onSubmit = {handleSubmit(onSubmit)} className='login_form'>
                    <input className="input_string" type="email" placeholder="Email address" required {...register("user_email")}>
                    </input>
                    <input className="input_string" type="password" placeholder="Password" required {...register("password")}>
                    </input>
                    <input className="submit_button" type="submit" value="Sign In"></input>
                </form>
                <Link to="/registration">
                    <p className='signup_link'>
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
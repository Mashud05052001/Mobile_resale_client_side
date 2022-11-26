import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import toast from 'react-hot-toast'
import Loading from '../../Shared/Amination/Loading';
import { useJwtToken } from '../../CustomHook/useJwtToken';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { login } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    // working on jwt
    const [jwtTokenEmail, setJwtTokenEmail] = useState(null);
    const token = useJwtToken(jwtTokenEmail);
    if (token) {
        setIsLoading(false)
        navigate(from, { replace: true });
        toast.success('You have successfully login our website')
    }
    const onSubmit = (data) => {
        setError("");
        setIsLoading(true);
        login(data.email, data.password)
            .then(result => {
                setJwtTokenEmail(result.user.email);
            })
            .catch(error => {
                setError(error.message)
                if (error.message === "Firebase: Error (auth/user-not-found).") {
                    setError('User Not Found On This Email Account')
                }
                setIsLoading(false);
            })
    }
    return (
        <div>
            {
                isLoading &&
                <div className='relative text-center w-full'>
                    <div className='absolute -top-[95px] md:-top-[95px] right-[10%] sm:right-[25%]'>
                        <Loading />
                    </div>
                </div>
            }
            <form onSubmit={handleSubmit(onSubmit)} className={`mb-6 ${isLoading ? 'opacity-60 ' : 'opacity-100'}`}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4  mt-5'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" required
                            {...register('email')}
                        />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type={`${showPassword ? 'text' : 'password'}`} placeholder="password" className="input input-bordered" required
                            {...register('password')}
                        />
                        <div className='absolute right-3 bottom-3.5 cursor-pointer text-accent'
                            onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ?
                                    <FaEyeSlash />
                                    :
                                    <FaEye />
                            }
                        </div>
                    </div>
                </div>
                <div className='flex label-text-alt mt-4 justify-between'>
                    <p className='ml-1 text-red-600'>
                        {
                            error && <span>Error: {error}</span>
                        }
                    </p>
                    <p className=" link link-hover">Forgot password?</p>
                </div>
                <button type="submit" className='btn text-white btn-secondary mt-5 w-full'>
                    Login Here
                </button>


            </form>
        </div>


    );
};

export default Login;
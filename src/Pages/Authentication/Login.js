import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import googleIcon from '../../media/Images/Icon/google.png'
import githubIcon from '../../media/Images/Icon/github.png'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    // const []
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mb-6'>
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


    );
};

export default Login;
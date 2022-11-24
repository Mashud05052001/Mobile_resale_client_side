import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import googleIcon from '../../media/Images/Icon/google.png'
import githubIcon from '../../media/Images/Icon/github.png'
import { Outlet } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    // const []
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
    }
    return (
        <section>
            <div className='md:w-[600px]  mx-auto mt-20 p-5 border-2 rounded-lg shadow-lg'>
                <h1 className='text-center text-xl font-semibold'>
                    <span className='border-b-4 px-4 border-black/50 rounded-sm'>Login</span>
                </h1>
                <Outlet />
            </div>
        </section>
    );
};

export default Login;
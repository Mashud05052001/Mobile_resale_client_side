import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import googleIcon from '../../media/Images/Icon/google.png'
import githubIcon from '../../media/Images/Icon/github.png'
import './signup.css'

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    // const []
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const image = data.img[0];
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mb-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 mt-5'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="name" className="input input-bordered" required
                        {...register('name')}
                    />
                </div>
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
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input type={`${showPassword ? 'text' : 'password'}`} placeholder="confirm password" className="input input-bordered" required
                        {...register('confirmPassword')}
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



                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Profile Picture</span>
                    </label>
                    <input type="file" accept='image/*' required className='border-2 py-2 rounded-lg profilePicture'
                        {...register('img')}
                    />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Create Account As A</span>
                    </label>
                    <select className="select select-bordered w-full font-normal max-w-xs"
                        {...register('typeOfUser')}
                    >
                        <option value='buyer'>Buyer</option>
                        <option value='seller'>Seller</option>
                    </select>
                </div>
            </div>
            <div className=' label-text-alt mt-4 '>
                <p className='ml-1 text-red-600'>
                    {
                        error && <span>Error: {error}</span>
                    }
                </p>
            </div>
            <button type="submit" className='btn text-white btn-secondary mt-5 w-full'>
                Sign Up Here
            </button>


        </form>
    );
};

export default Signup;
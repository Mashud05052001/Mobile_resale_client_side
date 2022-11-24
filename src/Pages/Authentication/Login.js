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
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-5'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" placeholder="email" className="input input-bordered" required
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
            <div className="divider font-semibold text-black/60">Also Join By</div>
            <div className='grid grid-cols-2 gap-x-4 '>
                <button type="submit" className='btn btn-secondary font-semibold text-white duration-200  rounded-lg mt-5 w-full h-12'>
                    <img src={googleIcon} alt="" className='w-5 h-5 mr-3' />
                    Google
                </button>
                <button type="submit" className='btn btn-secondary font-semibold text-white duration-200  rounded-lg mt-5 w-full h-12'>
                    <img src={githubIcon} alt="" className='w-5 h-5 mr-3' />
                    Github
                </button>
            </div>

        </form>


    );
};

export default Login;
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import googleIcon from '../../media/Images/Icon/google.png'
// import githubIcon from '../../media/Images/Icon/github.png'

// const Login = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState('');
//     // const []
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const onSubmit = data => {
//         console.log(data);
//     }
//     return (
//         <section>
//             <div className='md:w-[600px]  mx-auto mt-20 p-5 border-2 rounded-lg shadow-lg'>
//                 <h1 className='text-center text-xl font-semibold'>
//                     <span className='border-b-4 px-4 border-black/50 rounded-sm'>Login</span>
//                 </h1>
//                 <form onSubmit={handleSubmit(onSubmit)} className='mb-6'>
//                     <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-5'>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Email</span>
//                             </label>
//                             <input type="text" placeholder="email" className="input input-bordered" required
//                                 {...register('email')}
//                             />
//                         </div>
//                         <div className="form-control relative">
//                             <label className="label">
//                                 <span className="label-text">Password</span>
//                             </label>
//                             <input type={`${showPassword ? 'text' : 'password'}`} placeholder="password" className="input input-bordered" required
//                                 {...register('password')}
//                             />
//                             <div className='absolute right-3 bottom-3.5 cursor-pointer text-accent'
//                                 onClick={() => setShowPassword(!showPassword)}>
//                                 {
//                                     showPassword ?
//                                         <FaEyeSlash />
//                                         :
//                                         <FaEye />
//                                 }
//                             </div>
//                         </div>
//                     </div>

//                     <div className='flex label-text-alt mt-4 justify-between'>
//                         <p className='ml-1 text-red-600'>
//                             {
//                                 error && <span>Error: {error}</span>
//                             }
//                         </p>
//                         <p className=" link link-hover">Forgot password?</p>
//                     </div>
//                     <button type="submit" className='btn text-white btn-secondary mt-5 w-full'>
//                         Login Here
//                     </button>
//                     <div className="divider font-semibold text-black/60">Also Join By</div>
//                     <div className='grid grid-cols-2 gap-x-4 '>
//                         <button type="submit" className='btn btn-secondary font-semibold text-white duration-200  rounded-lg mt-5 w-full h-12'>
//                             <img src={googleIcon} alt="" className='w-5 h-5 mr-3' />
//                             Google
//                         </button>
//                         <button type="submit" className='btn btn-secondary font-semibold text-white duration-200  rounded-lg mt-5 w-full h-12'>
//                             <img src={githubIcon} alt="" className='w-5 h-5 mr-3' />
//                             Github
//                         </button>
//                     </div>

//                 </form>
//             </div>
//         </section>
//     );
// };

// export default Login;
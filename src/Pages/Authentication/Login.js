import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import toast from 'react-hot-toast'
import Loading from '../../Shared/Amination/Loading';
import { useJwtToken } from '../../CustomHook/useJwtToken';
import Swal from 'sweetalert2';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [forgetEmail, setForgetEmail] = useState('');
    const [fprgetEmailError, setForgetEmailError] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { login, resetPassword } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    // working on jwt
    const [jwtTokenEmail, setJwtTokenEmail] = useState(null);
    const token = useJwtToken(jwtTokenEmail);
    if (token) {
        setIsLoading(false)
        navigate(from, { replace: true });
    }
    const onSubmit = (data) => {
        setError("");
        setIsLoading(true);
        login(data.email, data.password)
            .then(result => {
                toast.success('You have successfully login our website')
                setJwtTokenEmail(result.user.email);
            })
            .catch(error => {
                setError(error.message)
                console.log(error.message);
                if (error.message === "Firebase: Error (auth/user-not-found).") {
                    setError('User Not Found On This Email Account')
                }
                else if (error.message === "Firebase: Error (auth/wrong-password).") {
                    setError('Wrong Password')
                }
                else if (error.message === "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).") {
                    setError('Your email is temporary blocked. Please try again after sometime or reset your password.');
                }
                setIsLoading(false);
            })
    }

    // console.log(forgetEmail.endsWith('.com'))
    const handleForget = event => {
        setForgetEmail(event.target.value);
    }
    const handleResetPassword = () => {

        resetPassword(forgetEmail)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Check Your Email Address To Reset Your Password',
                    showConfirmButton: false,
                    timer: 1500
                })
                setShowModal(false);
            })
            .catch(error => setForgetEmailError(error))
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
                    <label htmlFor="forget-password" onClick={() => setShowModal(true)} className="link link-hover">Forgot password?</label>
                </div>
                <button type="submit" className='btn text-white btn-secondary mt-5 w-full'>
                    Login Here
                </button>


            </form>
            {
                showModal &&
                <>
                    <input type="checkbox" id="forget-password" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box  relative">
                            <label htmlFor="forget-password" className="btn btn-sm btn-circle absolute right-2 top-2 bg-secondary/80 border-0 text-white hover:bg-secondary">✕</label>
                            <h3 className="text-lg font-bold ml-1">Please Provide Your Email Address</h3>
                            <input type="text" className='input input-bordered mt-6 w-full'
                                onBlur={handleForget}
                            />
                            <button
                                onClick={handleResetPassword}
                                className='mt-8 btn btn-secondary text-white float-right md:float-left'
                            >Reset Password</button>
                            <p className='text-sm absolute right-7 bottom-20 text-red-600'>{fprgetEmailError}</p>
                        </div>
                    </div>
                </>
            }
        </div>


    );
};

export default Login;
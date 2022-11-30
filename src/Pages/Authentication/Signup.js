import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BsInfoLg } from 'react-icons/bs';
import { AuthContext } from '../../Context/UserContext';
import toast from 'react-hot-toast'
import './signup.css';
import Loading from '../../Shared/Amination/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import { useJwtToken } from '../../CustomHook/useJwtToken';
import Swal from 'sweetalert2';
import Loading2 from '../../Shared/Amination/Loading2';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { user, signup, updateUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [jwtTokenEmail, setJwtTokenEmail] = useState(null);
    const token = useJwtToken(jwtTokenEmail);
    if (token) {
        setIsLoading(false);
        navigate(from, { replace: true });
    }
    const showPasswordInformation = () => {
        Swal.fire({
            title: 'Setting Password Conditions',
            html:
                '<ul> <li>Password & Confirm Password must be same.<li>Password Length Must be between (8-30) characters.</li><li>Password should be contain atleast 1 uppercase alphabet, 1 number & 1 special symbol</li></ul>',
            showClass: {
                popup: ''
            },
            hideClass: {
                popup: ''
            }
        })
    }
    const onSubmit = data => {
        const img = data.img[0];
        setError('');
        setIsLoading(true);
        // creating imageURL

        if (data.password !== data.confirmPassword) { setError('Password Doesn\'t Matched'); return; }
        if (data.password.length < 8 || data.password.length > 30) { setError('Password length must be 8-30 alphabet'); return; }
        if (!/(?=.*?[A-Z])/.test(data.password)) { setError('Password must have 1 UpperCase Word'); return; }
        if (!/(?=.*?[0-9])/.test(data.password)) { setError('Password must have 1 Digit'); return; }
        if (!/(?=.*?[#?!@$%^&*-])/.test(data.password)) { setError('Password must have 1 spacial character'); return; }
        console.log(data);
        const formData = new FormData();
        formData.append('image', img);

        const imgbbUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_api}`;
        // signup now
        signup(data.email, data.password)
            .then(result => {
                if (result?.user) {
                    fetch(imgbbUrl, { method: "POST", body: formData })
                        .then(res => res.json())
                        .then(imgData => {
                            if (imgData.success) {
                                const image = imgData.data.display_url;
                                updateUser(data.name, image)
                                    .then(() => {
                                        addUserToDB(image);
                                    })
                                    .catch(error => {
                                        console.log('updateUserError', error);
                                        setIsLoading(false);
                                    })
                            }
                        })
                }
            })
            .catch(error => {
                if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                    setError("This Email has already used before. Try to login or forget password")
                }
                setIsLoading(false);
            })

        const addUserToDB = (image) => {
            const userInfo = {
                name: data?.name,
                email: data?.email,
                image: image,
                role: data?.role,
                joinFrom: "password",
            }
            fetch(`${process.env.REACT_APP_server_url}/users`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result.acknowledged) {
                        toast.success('You Have successfully SignUp')
                        setJwtTokenEmail(data.email);
                    }
                })
        }



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
                        <div className='absolute  right-2 top-2.5 text-warning bg-primary/20 rounded-full cursor-pointer' onClick={showPasswordInformation}>
                            <BsInfoLg />
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
                            {...register('role')} required
                        >
                            <option value='buyer'>Buyer</option>
                            <option value='seller'>Seller</option>

                        </select>
                    </div>
                </div>
                <div className=' label-text-alt mt-4 '>
                    <p className='ml-1 text-red-600'>
                        {
                            error && <span className='absolute'>Error: {error}</span>
                        }
                    </p>
                </div>
                <button type="submit" className='btn text-white btn-secondary mt-8 w-full'>
                    Sign Up Here
                </button>


            </form>
        </div>
    );
};

export default Signup;
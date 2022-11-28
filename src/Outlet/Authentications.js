import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import googleIcon from '../media/Images/Icon/google.png'
import githubIcon from '../media/Images/Icon/github.png'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import { AuthContext } from '../Context/UserContext';
import Loading from '../Shared/Amination/Loading';
import { useJwtToken } from '../CustomHook/useJwtToken';
import toast from 'react-hot-toast';

const Authentications = () => {
    const [error, setError] = useState('');
    const [jwtTokenEmail, setJwtTokenEmail] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { googleJoin, githubJoin } = useContext(AuthContext);
    const token = useJwtToken(jwtTokenEmail);
    if (token) {
        navigate(from, { replace: true });
        toast.success('You Have successfully SignUp')
    }

    // userinfo added while login vie google and github
    const addUserToDB = (user, from) => {
        const userInfo = {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
            role: 'buyer',
            joinFrom: from
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
                console.log('mahi', data)
                // console.log(data)
            })
    }
    const handleGoogle = event => {
        event.preventDefault();
        googleJoin()
            .then(data => {
                // console.log(data.user)
                if (data?.user) {
                    setJwtTokenEmail(data?.user?.email);
                    addUserToDB(data.user, data?.user?.reloadUserInfo?.providerUserInfo[0]?.providerId);
                }
            })
            .catch(error => console.log(error.message))
    }
    const handleGithub = event => {
        event.preventDefault();
        githubJoin()
            .then(data => {
                if (data?.user) {
                    addUserToDB(data.user, data?.user?.reloadUserInfo?.providerUserInfo[0]?.providerId);
                }
            })
            .catch(error => console.log(error.message))
    }
    return (


        <section className='select-none'>
            <Navbar />
            <div className={`md:w-[650px] mb-20  mx-auto mt-10 p-5 pt-0 border-2 rounded-lg shadow-lg relative `}>

                <div className='text-center grid grid-cols-2 font-semibold -mx-5'>
                    <NavLink className={({ isActive }) => isActive ? '' : 'bg-primary/50'}
                        to='/authentications/login'>
                        <span className='rounded-sm flex justify-center my-3'>Login</span>
                    </NavLink>
                    {/* <div class="divider divider-horizontal">OR</div> */}
                    <NavLink className={({ isActive }) => isActive ? '' : 'bg-primary/50'}
                        to='/authentications/signup'>
                        <span className='rounded-sm flex justify-center  my-3'>Sing Up</span>
                    </NavLink>
                </div>
                <Outlet />
                <form>
                    <div className="divider font-semibold text-black/60">Also Join By</div>
                    <div className='grid grid-cols-2 gap-x-4 -mt-3'>
                        <button type="submit"
                            className='btn btn-secondary font-semibold text-white duration-200  rounded-lg mt-5 w-full h-12'
                            onClick={handleGoogle}
                        >
                            <img src={googleIcon} alt="" className='w-5 h-5 mr-3' />
                            Google
                        </button>
                        <button type="submit"
                            className='btn btn-secondary font-semibold text-white duration-200  rounded-lg mt-5 w-full h-12'
                            onClick={handleGithub}
                        >
                            <img src={githubIcon} alt="" className='w-5 h-5 mr-3' />
                            Github
                        </button>
                    </div>
                </form>
            </div >
        </section >

    );
};

export default Authentications;
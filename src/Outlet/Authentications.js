import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import googleIcon from '../media/Images/Icon/google.png'
import githubIcon from '../media/Images/Icon/github.png'
import { Link, NavLink, Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import { AuthContext } from '../Context/UserContext';
import Loading from '../Shared/Amination/Loading';

const Authentications = () => {
    const [error, setError] = useState('');

    const { googleJoin, githubJoin } = useContext(AuthContext);


    // userinfo added while login vie google and github
    const addUserToDB = (user, from) => {
        console.log(user)
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
                // console.log(data)
            })
    }
    const handleGoogle = event => {
        event.preventDefault();
        googleJoin()
            .then(result => {
                console.log(result.user)
                if (result?.user) {
                    addUserToDB(result.user, result?.user?.reloadUserInfo?.providerUserInfo[0]?.providerId);
                }
            })
            .catch(error => console.log(error.message))
    }
    const handleGithub = event => {
        event.preventDefault();
        githubJoin()
            .then(result => {
                if (result?.user) {
                    addUserToDB(result.user, result?.user?.reloadUserInfo?.providerUserInfo[0]?.providerId);
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
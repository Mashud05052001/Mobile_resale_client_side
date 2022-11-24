import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import navbarLogo from '../../media/Images/logo/headerLogo.png'
import './navbar.css'
import { Fade as Hamburger } from 'hamburger-react'
import { AuthContext } from '../../Context/UserContext';



const Navbar = () => {
    const { user, loading } = useContext(AuthContext);
    const [isOpen, setOpen] = useState(false)
    const navbarItems = <>
        <li className='px-1'>
            <NavLink to='/' className={({ isActive }) => isActive ? 'activeNavbarItems' : 'inActiveNavbarItems '}>
                <button className='rounded-md  xl:font-semibold  -mx-3  px-2 lg:px-7 '>
                    Home
                </button>
            </NavLink>
        </li>
        <li className='px-1'>
            <NavLink to='/categories' className={({ isActive }) => isActive ? 'activeNavbarItems' : 'inActiveNavbarItems '}>
                <button className='rounded-md  xl:font-semibold  -mx-3  px-2 lg:px-7 '>
                    Categories
                </button>
            </NavLink>
        </li>
        <li className='px-1'>
            <NavLink to='/blogs' className={({ isActive }) => isActive ? 'activeNavbarItems' : 'inActiveNavbarItems '}>
                <button className='rounded-md  xl:font-semibold  -mx-3  px-2 lg:px-7 '>Blogs</button>
            </NavLink>
        </li>
        <li className='px-1'>
            <NavLink to='/about' className={({ isActive }) => isActive ? 'activeNavbarItems' : 'inActiveNavbarItems '}>
                <button className='rounded-md  xl:font-semibold  -mx-3  px-2 lg:px-7 '>About</button>
            </NavLink>
        </li>
        <li className='px-1'>
            <NavLink to='/contactUs' className={({ isActive }) => isActive ? 'activeNavbarItems' : 'inActiveNavbarItems '}>
                <button className='rounded-md  xl:font-semibold  -mx-3  px-2 lg:px-7 '>Contact Us</button>
            </NavLink>
        </li>
        {
            !user &&
            <li className='px-1'>
                <NavLink to='/authentications' className={({ isActive }) => isActive ? 'activeNavbarItems' : 'inActiveNavbarItems '}>
                    <button className='rounded-md  xl:font-semibold  -mx-3  px-2 lg:px-7 '>Login</button>
                </NavLink>
            </li>
        }
    </>
    // this mini navbar again using because if we declare top then it will miss the state
    const mininavbarItems = <>
        <li className='px-1'>
            <NavLink to='/' onClick={() => setOpen(false)} >
                <button className='rounded-md  -mx-3  px-2'>
                    Home
                </button>
            </NavLink>
        </li>
        <li className='px-1'>
            <NavLink to='/categories' onClick={() => setOpen(false)} >
                <button className='rounded-md  -mx-3  px-2'>
                    Categories
                </button>
            </NavLink>
        </li>
        <li className='px-1'>
            <NavLink to='/blogs' onClick={() => setOpen(false)} >
                <button className='rounded-md  -mx-3  px-2'>Blogs</button>
            </NavLink>
        </li>
        <li className='px-1'>
            <NavLink to='/about' onClick={() => setOpen(false)} >
                <button className='rounded-md  -mx-3  px-2'>About</button>
            </NavLink>
        </li>
        <li className='px-1'>
            <NavLink to='/contactUs' onClick={() => setOpen(false)} >
                <button className='rounded-md  -mx-3  px-2'>Contact Us</button>
            </NavLink>
        </li>
        {
            !user &&
            <li className='px-1'>
                <NavLink to='/authentications' onClick={() => setOpen(false)} >
                    <button className='rounded-md  -mx-3  px-2'>Login</button>
                </NavLink>
            </li>
        }
    </>
    return (
        <section className='-mx-5 xl:mx-0 '>
            <div className="navbar bg-base-100">
                <div className='flex-1'>
                    <Link to='/' className='flex items-center btn h-full btn-ghost'>
                        <img src={navbarLogo} alt="" className='w-16 py-2 mr-2' />
                        <p className=" uppercase font-bold text-xl">Mobile Vend</p>
                    </Link>
                </div>
                <div className=" hidden lg:flex">
                    <ul className=" menu-horizontal p-0">
                        {navbarItems}
                    </ul>
                </div>
                {
                    user &&
                    <div className=" dropdown dropdown-end ml-5">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar" onClick={() => setOpen(false)}>
                            <div className="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" alt='' />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li><Link>Settings</Link></li>
                            <li><Link>Logout</Link></li>
                        </ul>
                    </div>}
                <div className="pl-4 pr-2 lg:hidden relative">
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                    {
                        isOpen ?
                            <ul className='absolute top-[55px] opacity-100 z-10 duration-100 -right-1.5 bg-base-100 menu-vertical menu mt-3 p-2 shadow menu-compact dropdown-content  rounded-box w-52'>
                                {mininavbarItems}
                            </ul>
                            :
                            <ul className='absolute top-[55px] opacity-0 -z-10 duration-100 -right-1.5 bg-base-100 menu-vertical menu mt-3 p-2 shadow menu-compact dropdown-content  rounded-box w-52'>
                                {mininavbarItems}
                            </ul>
                    }
                </div>


            </div>
        </section>
    );
};

export default Navbar;


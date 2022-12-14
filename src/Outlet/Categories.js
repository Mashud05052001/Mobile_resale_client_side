import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { Link, NavLink, Outlet } from 'react-router-dom';
import Loading from '../Shared/Amination/Loading';
import Navbar from '../Shared/Navbar/Navbar';
import '../Shared/Navbar/navbar.css'
import Footer from '../Shared/Footer/Footer';
import MobileLoading from '../Shared/Amination/MobileLoading';
const Categories = () => {
    const { data: categories = [], isLoading, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_server_url}/categories`);
            const data = await res.json();
            return data;
        }
    })
    // console.log(categories.sort(() => Math.random() - Math.random()).slice(0, 5));
    return (
        <div>
            <Navbar />
            <section className='mb-10'>
                {
                    isLoading ?
                        <div></div>
                        :
                        <div className=''>
                            <div className='flex flex-wrap'>
                                {categories.map((item, i) =>
                                    <NavLink key={i} to={`/categories/${item._id}?name=${item.name}`}
                                        // className=''
                                        className={({ isActive }) => isActive ?
                                            'px-3 py-2  btn-ghost hover:bg-primary/40 font-medium rounded-md'
                                            :
                                            'px-3 py-2 btn-ghost hover:bg-primary/40 font-medium rounded-md'
                                        }
                                    >
                                        <div className='text-center mx-auto '>
                                            <p className=' text-[15px] text-black/60'>{item.name}</p>
                                        </div>
                                    </NavLink>
                                )}
                            </div>
                        </div>
                }
            </section>
            <Outlet />

        </div>
    );
};

export default Categories;
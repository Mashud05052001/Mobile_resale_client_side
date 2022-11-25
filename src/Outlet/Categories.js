import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { Link, NavLink, Outlet } from 'react-router-dom';
import Loading from '../Shared/Amination/Loading';
import Loading2 from '../Shared/Amination/Loading2';
import Navbar from '../Shared/Navbar/Navbar';
import '../Shared/Navbar/navbar.css'
const Categories = () => {
    const { data: categories = [], isLoading, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_server_url}/categories`);
            const data = await res.json();
            return data;
        }
    })
    return (
        <div>
            <Navbar />
            <section className='mb-10'>
                {
                    isLoading ?
                        <Loading2 />
                        :
                        <div className=''>
                            <div className='flex flex-wrap'>
                                {categories.map((item, i) =>
                                    <NavLink key={i} to={`/categories/${item._id}`}
                                        // className=''
                                        className={({ isActive }) => isActive ?
                                            'btn btn-sm  btn-ghost hover:bg-primary/50 rounded-xl'
                                            :
                                            'btn btn-sm  btn-ghost hover:bg-primary/50 rounded-xl'
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
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import '../../../Shared/css/commonTextGradient.css'
import Loading2 from '../../../Shared/Amination/Loading2';
const HomeCategories = () => {
    const { data: categories = [], isLoading, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_server_url}/categories?number=5`);
            const data = await res.json();
            return data;
        }
    })
    console.log(categories);
    return (
        <div className='my-16 border-b-2  border-gray-800/5 pb-16 rounded-md shadow-sm'>
            <h1 className='text-4xl text-center w-48  mx-auto pb-2 font-bold text-black/70 text-gradient'>Categories</h1>
            {
                isLoading ?
                    <Loading2 />
                    :
                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10  gap-x-5 gap-y-0 md:gap-y-12'>
                        {categories.map((item, i) =>
                            <Link to={`/categories/${item._id}`} key={i} className='btn h-56 btn-ghost hover:bg-primary/50 rounded-xl'>
                                <div className='text-center mx-auto '>
                                    <div >
                                        <img src={item.image} alt="" className='w-40  mx-auto rounded-3xl' />
                                    </div>
                                    <p className='mt-5 text-[20px] text-black/60 font-bold'>{item.name}</p>
                                </div>
                            </Link>
                        )}
                    </div>
            }

            <div className='text-center'>
                <Link to='/categories'>
                    <button className=' mx-auto md:mx-0 mt-12  btn border-none rounded-xl p-3 text-center w-52 text-black  tracking-wide text-md font-bold  bg-gradient-to-r from-secondary via-primary to-primary hover:from-primary hover:via-secondary hover:to-secondary'>
                        See All Categories
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default HomeCategories;
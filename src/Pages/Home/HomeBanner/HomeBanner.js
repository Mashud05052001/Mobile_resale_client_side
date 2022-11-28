import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../../../media/Images/Pictures/HomeBanner.png'
import BannerTypeWritter from './BannerTypeWritter';
const HomeBanner = () => {
    return (
        <div className=' flex border-b-2  border-gray-800/5 shadow-sm flex-col-reverse md:grid grid-cols-5 pb-16 rounded-md '>
            <div className='mt-8 md:mt-16 col-span-3 md:ml-3 flex flex-col justify-center'>
                < h1 className='text-5xl font-semibold text-center md:text-left text-accent mb-3' > Mobile Vend</h1 >
                <BannerTypeWritter />
                <Link className='text-center md:text-left' to='/categories'>
                    <button className='mx-auto md:mx-0 mt-8 btn border-none rounded-xl p-3 text-center w-52 text-black  tracking-wide text-md font-bold  bg-gradient-to-r from-secondary via-primary to-primary hover:from-primary hover:via-secondary hover:to-secondary'>
                        Check Our Products
                    </button>
                </Link>
            </div >
            <div className='col-span-2 w-full mx-auto flex justify-center md:justify-end '>
                <img src={bannerImg} alt="" />
            </div>

        </div >
    );
};

export default HomeBanner;
import React from 'react';
import Lottie from "lottie-react";
import errorAnimation from "../../media/Json Animation/errorAnimation.json";

import { Link, useRouteError } from 'react-router-dom';
const ErrorPage = () => {
    const error = useRouteError();
    return (
        <section className='-ml-5 sm:ml-0 h-screen flex justify-center'>
            <div className='flex text-center lg:text-left items-center -mt-28 -xl:mt-20'>
                <div className='grid grid-cols-1 lg:grid-cols-2  w-full'>
                    <div className=' mx-auto'>
                        <Lottie animationData={errorAnimation} className='h-60 w-60 sm:h-96 sm:w-96 lg:h-[600px] lg:w-[600px]' />
                    </div>
                    <div className='h-full flex flex-col justify-center lg:ml-10 relative'>
                        <h1 className='text-4xl font-bold text-red-500 mb-5'>{error?.statusText || error?.message}</h1>
                        <h3 className='text-xl font-semibold'>{error?.status}</h3>
                        <p className='lg:text-right mt-5 lg:absolute bottom-0 right-0'>
                            <Link to='/' className='link-hover text-blue-600 font-medium'>Click here</Link> to go back to home page
                        </p>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ErrorPage;
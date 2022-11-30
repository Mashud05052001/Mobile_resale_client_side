import React from 'react';
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../media/Json Animation/MobileLoading.json";

const MobileLoading = () => {
    return (
        <section className='mx-auto w-full flex justify-center '>
            <div className='w-80 mt-6'>
                <Lottie animationData={groovyWalkAnimation} />
            </div>
        </section>
    );
};

export default MobileLoading;
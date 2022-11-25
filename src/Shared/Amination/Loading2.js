import React from 'react';
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../media/Json Animation/roundLoading.json";

const Loading2 = () => {
    return (
        <section className='mx-auto w-full flex justify-center '>
            <div className='w-40 mt-10'>
                <Lottie animationData={groovyWalkAnimation} />
            </div>
        </section>
    );
};

export default Loading2;
import React from 'react';
import { Typewriter } from 'react-simple-typewriter'
const BannerTypeWritter = () => {

    return (
        <div>
            <h1 className='text-center md:text-left'>
                <span className='text-black font-medium  text-xl '>
                    {/* Style will be inherited from the parent element */}
                    <Typewriter
                        words={[
                            "It's a trusted 2nd hand shop in our town.",
                            'You can Check the phone condition in the seller item description.',
                            'Here A seller can easily add an 2nd hand phone to sell.',
                            'A seller can easily promot his/her items.',
                        ]}
                        loop={50000}
                        cursor
                        cursorStyle='_'
                        typeSpeed={40}
                        deleteSpeed={40}
                        delaySpeed={3000}
                    />
                </span>
            </h1>
        </div>
    );
};

export default BannerTypeWritter;
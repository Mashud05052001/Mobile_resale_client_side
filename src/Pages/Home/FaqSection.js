import React from 'react';

const FaqSection = () => {
    return (
        <div className='max-w-screen-xl mx-auto rounded-xl my-16 mb-20 mt-20 border-gray-800/5 shadow-sm'>
            <h1 className='text-3xl font-bold text-gradient text-center mb-8'>Frequently Asked Question</h1>
            <div className="collapse collapse-arrow rounded-t-xl">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-primary/20 font-semibold text-md md:text-xl">
                    Q. &nbsp; Is the webside give the buyar a warrenty for buying any 2nd hand product?
                </div>
                <div className="collapse-content bg-primary/5 text-sm md:text-base">
                    <p className='pt-3'>
                        AAH.. Actually this is a 2nd hand based mobile webside so if we tried it but it can't be possible for us. We are just a media of you and the seller. If seller provide warrenty then definately you will received it.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-primary/20 font-semibold  text-md md:text-xl ">
                    Q. &nbsp; Is all products are good in this website?
                </div>
                <div className="collapse-content bg-primary/5 text-sm md:text-base">
                    <p className='pt-3'>
                        It's a 2nd hand mobile marketting shop where seller add his/her 2nd hand phone. So some times the phone can be damaged but we advise you that when you buy a phone you should read the description properly.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-primary/20 font-semibold  text-md md:text-xl ">
                    Q. &nbsp; If any seller cheat with me  then what should I do ?
                </div>
                <div className="collapse-content bg-primary/5 text-sm md:text-base">
                    <p className='pt-3'>
                        If any seller misbehave you you can definately complain out website with seller email & number. Alse After purchasing if you face some issue on this phone that the seller doesn't told you then there will be a opportunity for you to give us a complain about the seller will fully description.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FaqSection;
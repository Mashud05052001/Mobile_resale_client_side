import React from 'react';

const ComplainSection = () => {
    return (
        <div className=' max-w-screen-xl mx-auto mt-12 rounded-xl my-16  botder-b-2 pb-16 border-gray-800/5 shadow-sm'>
            <h1 className='text-3xl font-bold text-gradient text-center mb-8'>
                Complain Here
            </h1>
            <div className='flex flex-col md:flex-row md:justify-between'>
                <div className='flex justify-center '>
                    <img src="https://i.ibb.co/zGPDbzf/ezgif-com-gif-maker-removebg-preview.png" alt="" className='opacity-80' />
                </div>
                <div className='grid grid-cols-2 gap-x-8 mt-6'>
                    <div className="form-control h-20 ">
                        <label className="label">
                            <span className="label-text">Seller Name</span>
                        </label>
                        <input type="text" placeholder="name" className="input input-bordered" required
                        />
                    </div>
                    <div className="form-control h-20">
                        <label className="label">
                            <span className="label-text">Seller Email</span>
                        </label>
                        <input type="text" placeholder="email" className="input input-bordered" required
                        />
                    </div>
                    <div className="form-control col-span-2 " >
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea type="text" placeholder="Enter the issue detailes here..." className="textarea textarea-bordered" required
                        />
                    </div>
                    <button type="submit"
                        className='btn text-white btn-secondary mt-2 w-full '
                        onClick={() => alert("This Section Will Be Updated Later")}
                    >
                        Submit Here
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComplainSection;



// https://i.ibb.co/NFFcrYw/ezgif-com-gif-maker-1-removebg-preview.png
// https://i.ibb.co/zGPDbzf/ezgif-com-gif-maker-removebg-preview.png
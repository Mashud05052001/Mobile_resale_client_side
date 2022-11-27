import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
    const [phoneInfo, setPhoneInfo] = useState({});
    const [sellerInfo, setSellerInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const phoneId = useParams().id;
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_server_url}/singlePhone/${phoneId}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem("token")}`
            }
        })
            .then(result => {
                setPhoneInfo(result.data);

                fetch(`${process.env.REACT_APP_server_url}/users?id=${result?.data?.sellerDbId}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem("token")}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        setLoading(false);
                        setSellerInfo(data);
                    });
            })
    }, [phoneId])
    // console.log(sellerInfo)
    // console.log(phoneInfo)

    const { condition, imageURL, model, name, purchasedPrice, sellingPrice, sellingReason, state, status, uploadDate, usingTime, area, detailes } = phoneInfo;
    let sortDate = '';
    if (uploadDate) {
        sortDate = uploadDate.slice(0, 12);
    }
    return (
        <section className=' border-primary/80 mb-20'>
            {
                phoneInfo &&
                <div className='grid grid-cols-1 md:grid-cols-4'>

                    {/* products info */}
                    <div className='col-span-3 px-3 md:px-10'>
                        <div className='bg-primary/30 h-96 flex justify-center py-5'>
                            <img src={imageURL} alt="" className='h-full rounded-md' />
                        </div>
                        <div className='mt-3'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-gradient text-2xl sm:text-3xl font-bold'>Tk  {sellingPrice}/=</h1>
                                <p className='font-medium text-xs sm:text-sm'><span className='mr-2 font-base text-gray-500'>Upload Date : </span> {sortDate}</p>
                            </div>
                            <div className='mt-8 text-sm md:grid gap-y-4'>
                                <div className='font-medium'><span className='mr-2 font-base text-gray-500'>Condition:</span> {condition}</div>
                                <div className='font-medium mt-3 md:mt-0'><span className='mr-2 font-base text-gray-500'>Brand:</span> {model}</div>
                                <div className='font-medium mt-3 md:mt-0'><span className='mr-2 font-base text-gray-500'>Model:</span> {name}</div>
                                <div className='font-medium mt-3 md:mt-0'><span className='mr-2 font-base text-gray-500'>Authenticity:</span> {status}</div>
                                <div className='font-medium mt-3 md:mt-0'><span className='mr-2 font-base text-gray-500'>Used:</span> {usingTime} Months</div>
                                <div className='font-medium mt-3 md:mt-0'><span className='mr-2 font-base text-gray-500'>Location:</span> {area}, {state}</div>
                                <div className='font-medium mt-3 md:mt-0'><span className='mr-2 font-base text-gray-500'>Purchased Price:</span> {purchasedPrice}/=</div>
                                <div className='font-medium mt-3 md:mt-0'><span className='mr-2 font-base text-gray-500'>Location:</span> {area}, {state}</div>
                                <div className='font-medium mt-3 md:mt-0 col-span-2'><span className='mr-2 font-base text-gray-500'>Selling Reason:</span> {sellingReason}</div>
                                <div className=' col-span-2 '><span className='mr-2 font-medium text-gray-500 block mt-6'>Description:</span>
                                    <div className='mt-3 border-2 p-3 rounded-md h-40 w-[50%] overflow-auto'>
                                        {detailes}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* seller info */}
                    <div className='md:pl-3 mt-16 md:mt-0'>
                        <div className=''>
                            <div className='flex justify-between items-center'>
                                <div className='relative'>
                                    <p className='text-xl font-semibold'>{sellerInfo?.name}</p>
                                    {
                                        (sellerInfo?.status === 'verified') &&
                                        <div title='The Seller Is Verified'>
                                            <img src="https://i.ibb.co/7gs9d4q/correct-removebg-preview.png" alt="" className='w-8 h-5 absolute top-0 -right-8 cursor-pointer ' />
                                        </div>}
                                </div>
                                <h1 className='text-sm font-medium'>-Seller Info</h1>
                            </div>
                            <div className='mt-3'>

                            </div>
                            <div tabIndex={0} className="mt-5 collapse collapse-arrow border -py-4 border-base-300 bg-base-100 rounded-md">
                                <div className="collapse-title text-md font-medium">
                                    Contact With Seller
                                </div>
                                <div className="collapse-content">
                                    <p>Email: {sellerInfo?.email}</p>
                                    <p>Contact:  {phoneInfo?.sellerNumber}</p>
                                </div>

                            </div>
                            <div className='mt-8 text-center flex justify-around items-center md:block'>
                                <button className='btn btn-sm w-40 text-white btn-secondary'>
                                    Buy This Phone
                                </button>
                                <button className='btn btn-sm w-40 text-white btn-secondary md:mt-3' >Add My Wiselist</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    );
};

export default SingleProduct;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const AllPhones = ({ phoneInfo, promoteIcon }) => {
    // console.log(phoneInfo)
    const [dataLoading, setDataLoading] = useState(true);
    const [sellerInfo, setSellerInfo] = useState([]);
    const { name, sellingPrice, imageURL, status, state, area, condition, sellerDbId, _id } = phoneInfo;
    useEffect(() => {
        fetch(`${process.env.REACT_APP_server_url}/users?id=${sellerDbId}&role=seller`, {
            headers: {
                authorization: `bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setDataLoading(false);
                setSellerInfo(data);
            })
    }, [sellerDbId])
    console.log(phoneInfo?.promoteStatus)
    return (
        <div className='py-5 pb-12 px-3  rounded-xl w-44 md:w-48 relative bg-primary/30 '>
            <p className='absolute top-0 left-[55px] md:left-[63px] text-red-800 bg-white rounded-b-xl font-medium px-4'>{sellingPrice}/=</p>
            {
                sellerInfo?.status === 'verified' &&
                <div title='Seller is Verified'>
                    <img src="https://i.ibb.co/7gs9d4q/correct-removebg-preview.png" className='absolute w-6 h-6 -top-1.5 -right-1.5  rounded-full bg-white' alt="" />
                </div>
            }
            {
                phoneInfo?.promoteStatus && promoteIcon &&
                <div title='Promoted Product'>
                    <img src="https://i.ibb.co/F8H1j80/gold-medal.png" className='absolute w-9 h-9 top-10 right-3  rounded-full' alt="" />
                </div>
            }

            <div className='flex justify-center mt-5'>
                <img src={imageURL} alt="" className=' rounded-md w-36 md:w-40 h-36 md:h-40' />
            </div>
            <div className='mt-5'>
                <h1 className='text-md font-semibold'>{name}</h1>
                <div className='text-xs mt-2'>
                    <p> {condition}, {status}</p>
                    <p>{area}, {state}</p>
                </div>
            </div>
            <Link to={`/categories/singlePhone/${_id}`}>
                <button className='btn btn-sm bg-primary/40 border-none  rounded-t-none hover:bg-primary/80 absolute bottom-0 w-full right-0 text-gray-800'>Detailes</button>
            </Link>

        </div>
    );
};

export default AllPhones;
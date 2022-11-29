import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import AllPhones from '../../../Shared/PhonesShow/AllPhones';

const AdvertisedItems = ({ allPromotePhone }) => {
    // const { data: allPromotePhone = [], usLoading, refetch } = useQuery({
    //     queryKey: ['allPhones'],
    //     queryFn: () => fetch(`${process.env.REACT_APP_server_url}/allPhones?need=promoteItems`, {
    //         headers: {
    //             authorization: `bearer ${localStorage.getItem('token')}`,
    //         }
    //     }).then(res => res.json())
    // })
    // console.log(allPromotePhone)
    console.log(allPromotePhone)
    return (
        <div className='my-16 border-b-2  border-gray-800/5 pb-16 rounded-md shadow-sm'>
            <div className='flex justify-center items-center'>
                <h1 className='text-4xl  w-56 pb-2 font-bold text-black/70 text-gradient'>Top Products</h1>
                <div className='tooltip tooltip-right' data-tip='Promoted Products'>
                    <img src="https://i.ibb.co/F8H1j80/gold-medal.png" alt="" className='w-16 rounded-full ml-5' />
                </div>
            </div>
            <div>
                <div className='mt-14 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8 md:gap-y-16 '>
                    {
                        (allPromotePhone.length > 0) &&
                        allPromotePhone.map(phone => <AllPhones key={phone?._id} phoneInfo={phone} promoteIcon={false} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default AdvertisedItems;
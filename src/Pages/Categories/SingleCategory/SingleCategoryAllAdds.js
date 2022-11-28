import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading2 from '../../../Shared/Amination/Loading2';
import AllPhones from '../../../Shared/PhonesShow/AllPhones';

const SingleCategoryAllAdds = () => {
    const id = useParams().id;
    const modelName = useLocation().search.slice(6);
    const [allPhone, setAllPhone] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_server_url}/singleCategory/${id}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem("token")}`
            }
        })
            .then(result => {
                setAllPhone(result.data);
                setDataLoading(false);
            })
    }, [id])
    console.log(allPhone)
    const handleSort = () => {
        // it will done after
    }
    return (
        <div>
            {
                dataLoading ?
                    <Loading2 />
                    :
                    <>
                        {
                            (allPhone.length === 0) ?
                                <div className='mt-20 text-center'>
                                    <h1 className='text-3xl mt-5 font-semibold text-red-600'>There are no phone available in {modelName} brand</h1>
                                </div>
                                :
                                <div className='mb-20 -ml-2'>
                                    <div className='flex mb-12 justify-between items-center'>
                                        <p title='This section will be updated next' className='text-sm md:text-base'>Products (1-10) from 100</p>
                                        <h1 className='hidden md:block text-2xl font-semibold text-gradient'>{allPhone[0].model}</h1>
                                        <form onChange={handleSort} className='lg:mr-3'>
                                            <select className="select-sm  md:select-base  border-b-2 focus:outline-black/5 text-opacity-30 rounded-md border-0 border-black/20 w-full max-w-xs" name='sort'>
                                                <option defaultValue={''}>Select Sorting</option>
                                                <option value='lth'>Price Low To High</option>
                                                <option value='htl'>Price High To Low</option>
                                            </select>
                                        </form>
                                    </div>

                                    {
                                        dataLoading ?
                                            <Loading2 />
                                            :
                                            <>
                                                <h1 className='text-center mb-9 text-3xl -mt-4 md:hidden bg-red-600 text-gradient'>All Products</h1>
                                                <div className=' grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8 md:gap-y-16 '>
                                                    {
                                                        (allPhone.length > 0) &&
                                                        allPhone.map(phone => <AllPhones key={phone?._id} phoneInfo={phone} />)
                                                    }
                                                </div>
                                            </>
                                    }
                                </div>
                        }
                    </>
            }
        </div>
    );
};

export default SingleCategoryAllAdds;
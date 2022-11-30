import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Loading2 from '../../../Shared/Amination/Loading2';
import ImageZoom from 'react-image-zooom';
import ModalForBuyProduct from './ModalForBuyProduct/ModalForBuyProduct';
import { AuthContext } from '../../../Context/UserContext';
import toast from 'react-hot-toast';
import { MdOutlineReport } from 'react-icons/md';
import ConfirmationModal from '../../../Shared/Modal/ConfirmationModal';
import Swal from 'sweetalert2';
import { useAuser } from '../../../CustomHook/useAuser';
import MobileLoading from '../../../Shared/Amination/MobileLoading';

const SingleProduct = () => {
    const [phoneInfo, setPhoneInfo] = useState({});
    const [sellerInfo, setSellerInfo] = useState({});
    const [showModal, setShowModal] = useState(null);
    const [loading, setLoading] = useState(true);
    const phoneId = useParams().id;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    // receiving the phone information
    const customerInfo = useAuser(user?.email, user?.providerData[0]?.providerId);
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
    const { condition, imageURL, model, name, purchasedPrice, sellingPrice, sellingReason, state, status, uploadDate, usingTime, area, detailes } = phoneInfo;
    let sortDate = '';
    if (uploadDate) {
        sortDate = uploadDate.slice(0, 12);
    }
    // handling the order section
    const handleBuy = () => {
        if (sellerInfo.name === user?.displayName && sellerInfo.name === user?.displayName) {
            toast.error("You cann't buy your own product. If you want you can delete this product from dashboard");
        }
        else {
            setShowModal(true);
        }
    }
    // handling the wiselist section
    const handleWiseList = () => {
        if (sellerInfo.name === user?.displayName && sellerInfo.name === user?.displayName) {
            toast.error("You cann't add your own product in your wiselist. If you want you can delete this product from dashboard");
        }
        else {
            const information = {
                userName: user?.displayName,
                userEmail: user?.email,
                userId: customerInfo?._id,
                phone: name,
                phoneId: phoneInfo?._id,
                price: phoneInfo?.sellingPrice,
                sellerId: sellerInfo?._id,
                soldStatus: false,
            }

            Swal.fire({
                title: 'Do you want to add this phone on your wiselist?',
                showCancelButton: true,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`${process.env.REACT_APP_server_url}/wiseList`, {
                        method: "POST",
                        headers: {
                            authorization: `bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(information)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success('You have successfully added this item to your wiselist');
                                // setShowModal(null);
                            }
                            else if (data.message === 'alreadyAdded') {
                                toast.error("You cann't add same item multiple time. Please check your wiselist to buy.");
                                // setShowModal(null);
                            }
                        })
                }
            })
        }
    }
    // report handeling
    const handleReport = (id) => {
        if (sellerInfo.name === user?.displayName && sellerInfo.name === user?.displayName) {
            toast.error("You can't report on your item");
        }
        else {
            Swal.fire({
                title: 'Do you want to make a report on this item?',
                showCancelButton: true,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`${process.env.REACT_APP_server_url}/allPhones?id=${id}`, {
                        method: "PATCH",
                        headers: {
                            authorization: `bearer ${localStorage.getItem('token')}`,
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success('You have successfully report on this item.')
                                navigate('/categories');
                            }
                        });
                }
            })
        }
    }
    console.log(sellerInfo)
    // console.log(user?.email, user?.displayName)
    // console.log(phoneInfo)
    return (
        <>
            {
                loading ?
                    <MobileLoading />
                    :
                    <section className=' border-primary/80 mb-20'>
                        {
                            phoneInfo &&
                            <div className='grid grid-cols-1 md:grid-cols-4 '>

                                {/* products info */}
                                <div className='col-span-3 px-3 md:px-10'>
                                    <div className='relative bg-primary/20 rounded-lg h-96 flex justify-center py-5'>
                                        <ImageZoom src={imageURL} alt="A image to apply the ImageZoom plugin" width='430' className='border-2 border-gray-200 rounded-xl' />
                                        <div className='absolute h-8 w-8 -top-1.5 -left-1.5'>
                                            <MdOutlineReport className='h-6 w-6 bg-warning rounded-full cursor-pointer text-white' onClick={() => handleReport(phoneInfo?._id)} />
                                        </div>
                                        {/* <img src={imageURL} alt="" className='h-full rounded-md ' /> */}

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
                                                <div className='mt-3 border-2 p-3 rounded-md h-40 w-[55%] overflow-auto'>
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
                                            <label htmlFor="phoneBuyModal" onClick={() => handleBuy()} className="btn btn-sm w-40 text-white btn-secondary">
                                                Buy This Phone
                                            </label>
                                            <button className='btn btn-sm w-40 text-white btn-secondary md:mt-3' onClick={() => handleWiseList()}  >Add My Wiselist</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </section>
            }
            {
                showModal &&
                <ModalForBuyProduct userName={user?.displayName} userEmail={user?.email} sellerInfo={sellerInfo}
                    phone={name} price={sellingPrice} setShowModal={setShowModal} phoneId={phoneInfo?._id} userId={customerInfo?._id}
                />
            }
        </>
    );
};

export default SingleProduct;
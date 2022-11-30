import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { BsInfoLg } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import MobileLoading from '../../../Shared/Amination/MobileLoading';
import Payment from '../Payment';


const MyOrders = () => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [passedInfoToModal, setPassedInfoToModal] = useState({});
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success text-white',
            cancelButton: 'btn btn-danger text-white'
        },
        buttonsStyling: false
    })

    const { data: allOrders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: () => fetch(`${process.env.REACT_APP_server_url}/orders?id=${localStorage.getItem('secretCode')}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
    })
    const showTransitionId = (item) => {
        console.log(item)
        Swal.fire({
            title: item?.phone,
            html:
                `<p>Price : ${item?.price}</p><p>Transaction ID : ${item?.transactionId}</p>`,
            showClass: {
                popup: ''
            },
            hideClass: {
                popup: ''
            }
        })
    }
    const ordersCount = allOrders.length;
    const handleStatusChange = (info) => {
        setPassedInfoToModal(info);
        setShowPaymentModal(true);
    }
    const handleDelete = (itemId, itemName) => {
        swalWithBootstrapButtons.fire({
            title: `Are you sure to delete this ${itemName} order?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            // cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`${process.env.REACT_APP_server_url}/orders?id=${itemId}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            refetch();
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <div>
            {
                isLoading ?
                    <MobileLoading />
                    :
                    <>
                        {
                            ordersCount === 0 ?
                                <p className='text-3xl md:text-4xl mt-10 text-center font-semibold text-gradient w-[80%] md:w-[70%] mx-auto'>
                                    There are no orders available in your order section
                                </p>
                                :
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                            <tr >
                                                <th>No</th>
                                                <th>Phone</th>
                                                <th className='pl-6'>Price</th>
                                                <th>Meetup Location</th>
                                                <th className='pl-8'>Status</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allOrders.map((item, i) =>
                                                    <tr key={item?._id}>
                                                        <th>{i + 1}</th>
                                                        <td>{item?.phone}</td>
                                                        <td>{item?.price}/=</td>
                                                        <td>{item?.location}</td>
                                                        {
                                                            item?.soldStatus ?
                                                                <td className='text-green-500 -ml-5' >Purchased</td>
                                                                :
                                                                <td>

                                                                    {/* <button className='btn btn-xs -ml-5 btn-primary '
                                                                        onClick={() => handleStatusChange(item?._id, item?.name)}>
                                                                        Purchased Now
                                                                    </button> */}
                                                                    <label htmlFor="payment-modal" className='btn btn-xs -ml-5 btn-primary'
                                                                        onClick={() => handleStatusChange(item)}>
                                                                        Purchased Now
                                                                    </label>
                                                                </td>
                                                        }
                                                        <td >
                                                            {
                                                                item?.transactionId ?
                                                                    <div className=' right-2 top-2.5 text-warning ml-2 rounded-full cursor-pointer' onClick={() => showTransitionId(item)}>
                                                                        <BsInfoLg />
                                                                    </div>
                                                                    :
                                                                    <RiDeleteBinLine className='w-5 cursor-pointer h-5 text-red-600 ml-2' onClick={() => handleDelete(item?._id, item?.phone)} />
                                                            }
                                                        </td>
                                                    </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                        }
                    </>
            }
            {
                showPaymentModal &&
                <Payment info={passedInfoToModal} wiseList={false} refetch={refetch} />
            }
        </div>
    );
};

export default MyOrders;
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { RiDeleteBinLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import Loading2 from '../../../Shared/Amination/Loading2';
import MobileLoading from '../../../Shared/Amination/MobileLoading';

const AllSeller = () => {
    // const [allSeller,setAllSeller] = useState([]);
    const { data: allSeller = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch(`${process.env.REACT_APP_server_url}/users?need=seller`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
    })
    const sellerCount = allSeller.length;
    const handleDelete = (id, userName) => {
        const confirm = window.confirm("Are you sure to delete this seller?");
        if (confirm) {
            const url = `${process.env.REACT_APP_server_url}/users?id=${id}`;
            console.log(url)
            fetch(url, {
                method: "DELETE",
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        refetch();
                        toast.success(`You have seccessfully delete ${userName}`);
                    }
                })

        }
    }
    const handleStatusChange = (id, userName) => {
        const confirm = window.confirm("Are you sure to update seller status?");
        if (confirm) {
            const url = `${process.env.REACT_APP_server_url}/users?id=${id}`;
            fetch(url, {
                method: "PUT",
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.acknowledged) {
                        refetch();
                        toast.success(`You have seccessfully change the status of the ${userName}`);
                    }
                })
        }
    }
    return (
        <div>
            {
                isLoading ?
                    <MobileLoading />
                    :
                    <>
                        {
                            sellerCount === 0 ?
                                <p className='text-3xl md:text-4xl mt-10 text-center font-semibold text-gradient w-[80%] md:w-[70%] mx-auto'>
                                    There are no seller available in your website
                                </p>
                                :
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                            <tr >
                                                <th>No</th>
                                                <th>Name</th>
                                                <th>E-Mail</th>
                                                <th>Status</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allSeller.map((seller, i) =>
                                                    <tr key={seller?._id}>
                                                        <th>{i + 1}</th>
                                                        <td>{seller?.name}</td>
                                                        <td>{seller?.email}</td>
                                                        {
                                                            seller?.status ?
                                                                <td className='text-green-500 -ml-5' >Verified</td>
                                                                :
                                                                <td>
                                                                    <button className='btn btn-xs -ml-5 btn-primary '
                                                                        onClick={() => handleStatusChange(seller?._id, seller?.name)}>
                                                                        Verify Now
                                                                    </button>
                                                                </td>
                                                        }
                                                        <td>
                                                            <RiDeleteBinLine className='w-5 cursor-pointer h-5 text-red-600 ml-2' onClick={() => handleDelete(seller?._id, seller?.name)} />
                                                        </td>
                                                    </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                        }
                    </>
            }
        </div>
    );
};

export default AllSeller;
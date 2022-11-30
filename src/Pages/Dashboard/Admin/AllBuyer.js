import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { RiDeleteBinLine } from 'react-icons/ri';
import Loading2 from '../../../Shared/Amination/Loading2';
import toast from 'react-hot-toast';
import MobileLoading from '../../../Shared/Amination/MobileLoading';

const AllBuyer = () => {
    const [allBuyer, setAllBuyer] = useState([]);
    const [buyerLoading, setBuyerLoading] = useState(true);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_server_url}/users?need=buyer`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setBuyerLoading(false);
                setAllBuyer(data);
            });
    }, [])
    const handleDelete = (id, username) => {
        const confirm = window.confirm("Are you sure to delete this Buyer?");
        const url = `${process.env.REACT_APP_server_url}/users?id=${id}`;
        if (confirm) {
            fetch(url, {
                method: "DELETE",
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success(`You have seccessfully delete ${username}`);
                    }
                })
        }
    }

    return (
        <div>
            {
                buyerLoading ?
                    <MobileLoading />
                    :
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr >
                                    <td>No</td>
                                    <th>Name</th>
                                    <th>E-Mail</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allBuyer.map((buyer, i) =>
                                        <tr key={buyer?._id}>
                                            <td>{i + 1}</td>
                                            <td>{buyer?.name}</td>
                                            <td>
                                                {buyer?.email ? buyer?.email : "null"}
                                            </td>
                                            <td>
                                                <RiDeleteBinLine className='w-5 cursor-pointer h-5 text-red-600 ml-2' onClick={() => handleDelete(buyer?._id, buyer?.name)} />
                                            </td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default AllBuyer;
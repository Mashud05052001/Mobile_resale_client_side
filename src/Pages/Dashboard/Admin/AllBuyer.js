import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { RiDeleteBinLine } from 'react-icons/ri';
import Loading2 from '../../../Shared/Amination/Loading2';

const AllBuyer = () => {
    const [allBuyer, setAllBuyer] = useState([]);
    const [buyerLoading, setBuyerLoading] = useState(true);
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

    return (
        <div>
            {
                buyerLoading ?
                    <Loading2 />
                    :
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr >
                                    <td>No</td>
                                    <th>Name</th>
                                    <th>E-Mail</th>
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
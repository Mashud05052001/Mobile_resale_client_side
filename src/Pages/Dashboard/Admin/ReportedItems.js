import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { RiDeleteBinLine } from 'react-icons/ri';
import Loading2 from '../../../Shared/Amination/Loading2';
import toast from 'react-hot-toast';
import MobileLoading from '../../../Shared/Amination/MobileLoading';

const ReportedItems = () => {
    const [items, setItems] = useState([]);
    const [itemsLoading, setItemsLoading] = useState(true);
    const [number, setNumber] = useState(1);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_server_url}/allPhones?condition=report`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setItemsLoading(false);
                setItems(data);
            });
    }, [number])
    const handleDelete = (id, username) => {
        const confirm = window.confirm("Are you sure to delete this Buyer?");
        const url = `${process.env.REACT_APP_server_url}/allPhones?id=${id}`;
        if (confirm) {
            fetch(url, {
                method: "DELETE",
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.acknowledged) {
                        setNumber(number + 1);
                        toast.success(`You have seccessfully delete ${username}`);
                    }
                })
        }
    }

    return (
        <div>
            {
                itemsLoading ?
                    <MobileLoading />
                    :
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr >
                                    <td>No</td>
                                    <td>Image</td>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Report Count</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map((item, i) =>
                                        <tr key={item?._id}>
                                            <td>{i + 1}</td>
                                            <td>
                                                <img src={item?.imageURL} alt="" className='w-16 rounded-lg shadow-sm' />
                                            </td>
                                            <td>{item?.name}</td>
                                            <td>{item?.sellingPrice}/=</td>
                                            <td className='pl-14 font-semibold text-red-600'>{item?.report}</td>
                                            <td>
                                                <RiDeleteBinLine className='w-5 cursor-pointer h-5 text-red-600 ml-2' onClick={() => handleDelete(item?._id, item?.name)} />
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

export default ReportedItems;
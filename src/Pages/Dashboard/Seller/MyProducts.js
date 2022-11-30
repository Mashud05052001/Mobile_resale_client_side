import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/UserContext';
import { useAuser } from '../../../CustomHook/useAuser';
import { RiDeleteBinLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import Loading2 from '../../../Shared/Amination/Loading2';
import Swal from 'sweetalert2';
import MobileLoading from '../../../Shared/Amination/MobileLoading';

const MyProducts = () => {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const url = `${process.env.REACT_APP_server_url}/allPhones?id=${localStorage.getItem('secretCode')}`;
    const { data: AllProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch(url, {
            headers: {
                authorization: `bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
    })
    // console.log(AllProducts);
    const handleDelete = id => {
        Swal.fire({
            title: 'Do you really want to delete this item?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setDeleteLoading(true);
                const url = `${process.env.REACT_APP_server_url}/allPhones?id=${id}`;
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
                            setDeleteLoading(false);
                            toast.success(`You have seccessfully delete this product`);
                        }
                    })
            }
        })
    }
    const handlePromot = id => {
        Swal.fire({
            title: 'Do you really want to promot this item?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_server_url}/allPhones?promot=${id}`, {
                    method: "PATCH",
                    headers: {
                        authorization: `bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result.acknowledged) {
                            toast.success('You have successfully promot an item')
                            refetch();
                        }
                    })
            }
        })
    }
    return (
        <div>
            {
                (isLoading || deleteLoading) &&
                <div >
                    <MobileLoading />
                </div>

            }
            <div className={`overflow-x-auto w-full ${isLoading || deleteLoading ? '-mt-[250px] opacity-40' : 'mt-0'}`}>
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Upload Date</th>
                            <th>Upload Time</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            AllProducts.reverse().map((product, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>

                                        <div className="avatar">
                                            <div className=" w-12 h-12">
                                                <img src={product?.imageURL} alt='' />
                                            </div>
                                        </div>

                                    </td>
                                    <td>
                                        {product?.name}
                                    </td>
                                    <td>{product?.uploadDate?.slice(0, 12)}</td>
                                    <td>{product?.uploadDate?.slice(14)}</td>
                                    <td>
                                        {
                                            product?.promoteStatus ?
                                                <p className='text-green-600 -ml-3'>Promoted</p>
                                                :
                                                <button className='-ml-7 btn btn-xs bg-primary text-black rounded-[5px]  border-none bg-opacity-50 hover:bg-opacity-100 hover:bg-primary' onClick={() => handlePromot(product._id)}>
                                                    Promote Now
                                                </button>
                                        }
                                    </td>
                                    <th>

                                        <RiDeleteBinLine className='w-5 cursor-pointer h-5 text-red-600 ml-2' onClick={() => handleDelete(product._id)} />

                                    </th>
                                </tr>
                            )
                        }



                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyProducts;
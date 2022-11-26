import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/UserContext';
import { useAuser } from '../../../CustomHook/useAuser';
import { RiDeleteBinLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import Loading2 from '../../../Shared/Amination/Loading2';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const sellerInfo = useAuser(user?.email, user?.providerData[0]?.providerId)
    const sellerId = sellerInfo?._id;
    const url = `${process.env.REACT_APP_server_url}/allPhones?id=${sellerId}`;
    const { data: AllProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['users', sellerInfo],
        queryFn: () => fetch(url, {
            headers: {
                authorization: `bearer ${localStorage.getItem('token')}`,
            },
        }).then(res => res.json())
    })
    const handleDelete = id => {
        setDeleteLoading(true);
        const confirm = window.confirm("Are you sure to delete this product?")
        if (confirm) {
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
    }
    return (
        <div>
            {
                (isLoading || deleteLoading) &&
                <div >
                    <Loading2 />
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
                                    <td>{product?.uploadDate.slice(0, 12)}</td>
                                    <td>{product?.uploadDate.slice(14)}</td>
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
import { format } from 'date-fns/esm';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/UserContext';
import { useAuser } from '../../../CustomHook/useAuser';
import Loading2 from '../../../Shared/Amination/Loading2';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    // console.log(user?.email, user?.providerData[0]?.providerId);
    const sellerInfo = useAuser(user?.email, user?.providerData[0]?.providerId)
    // console.log(sellerInfo)
    const area = ['Bagerhat', 'Bandarban', 'Barguna', 'Barisal', 'Bhola', 'Bogra', 'Brahmanbaria', 'Chandpur', 'Chottogram', 'Chuadanga', 'Comilla', "Cox's Bazar", 'Dhaka', 'Dinajpur', 'Faridpur', 'Feni', 'Gaibandha', 'Gazipur', 'Gopalganj', 'Habiganj', 'Jamalpur', 'Jessore', 'Jhalokati', 'Jhenaidah', 'Joypurhat', 'Khulna', 'Kishoreganj', 'Kurigram', 'Kushtia', 'Lakshmipur', 'Lalmonirhat', 'Madaripur', 'Magura', 'Manikganj', 'Meherpur', 'Moulvibazar', 'Munshiganj', 'Mymensingh', 'Narail', 'Narayanganj', 'Narsingdi', 'Natore', 'Natore', 'Nawabganj', 'Nawabganj', 'Netrakona', 'Nilphamari', 'Noakhali ', 'Pabna', 'Panchagarh', 'Patuakhali', 'Pirojpur', 'Rajbari', 'Rajshahi', 'Rangamati', 'Rangpur', 'Satkhira', 'Shariatpur', 'Sherpur', 'Sirajganj', 'Sunamganj', 'Sylhet', 'Tangail', 'Thakurgaon'];
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_server_url}/categories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                setIsLoading(false);
                // setIsLoading(true);
            })
            .catch(err => setError(err));
    }, [])

    const formData = new FormData();
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_api}`;
    // console.log(categories)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        setIsLoading(true);
        const img = data.image[0];
        formData.append('image', img);
        fetch(imgbbUrl, { method: "POST", body: formData })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const image = imgData.data.display_url;
                    const date = format(new Date(), "PPpp");
                    delete data.image;
                    data["imageURL"] = image;
                    data["uploadDate"] = date;
                    data["sellerName"] = sellerInfo?.name;
                    data["sellerDbId"] = sellerInfo?._id;
                    // console.log(data)
                    fetch(`${process.env.REACT_APP_server_url}/allPhones`, {
                        method: "POST",
                        headers: {
                            authorization: `bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    })
                        .then(res => res.json)
                        .then(data => {
                            if (data) {
                                setIsLoading(false);
                                toast.success('You have successfully add a products');
                                navigate('/dashboard/products');
                            }
                        }).catch(err => setError(err));
                }
            }).catch(err => setError(err));

    }
    return (
        <div className='mb-20'>
            {
                isLoading &&
                <div>
                    <Loading2 />
                </div>

            }
            <form onSubmit={handleSubmit(onSubmit)} className={`mb-6 ${isLoading ? 'opacity-40  -mt-[275px]' : 'opacity-100'}`}>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 mt-5'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Enter Phone Name</span>
                        </label>
                        <input type="text" placeholder="name" className="input input-bordered" required
                            {...register('name')}
                        />
                    </div>
                    <div className="form-control relative ">
                        <label className="label">
                            <span className="label-text">Select Phone Model</span>
                        </label>
                        <select className="select select-bordered w-full font-normal max-w-full"
                            {...register('model')} required>
                            {
                                categories.map((item, i) =>
                                    <option key={i} value={item?.name} className='bg-primary'>
                                        {item?.name}
                                    </option>
                                )
                            }
                        </select>
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Select Your State</span>
                        </label>
                        <select className="select select-bordered w-full font-normal max-w-full"
                            {...register('state')} required>
                            {
                                area.map((item, i) =>
                                    <option key={i} value={item} className='bg-primary'>
                                        {item}
                                    </option>
                                )
                            }
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Enter Your Area</span>
                        </label>
                        <input type="text" placeholder="area" className="input input-bordered" required
                            {...register('area')}
                        />
                    </div>

                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Phone Picture</span>
                        </label>
                        <input type="file" accept='image/*' required className='border-2 py-2 rounded-lg profilePicture'
                            {...register('image')}
                        />
                    </div>


                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Phone Status</span>
                        </label>
                        <select className="select select-bordered w-full font-normal max-w-full"
                            {...register('status')} required>
                            <option value="Original" defaultValue="Original" className='bg-primary'>Original</option>
                            <option value="Copy" className='bg-primary'>Copy</option>
                        </select>
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Phone Condition</span>
                        </label>
                        <select className="select select-bordered w-full font-normal max-w-full"
                            {...register('condition')} required>
                            <option value="Almost New" defaultValue="Almost New" className='bg-primary'>Almost New</option>
                            <option value="Used - Like New" className='bg-primary'>Used - Like New</option>
                            <option value="Used - No Other Problems" className='bg-primary'>Used - No Other Problems</option>
                            <option value="Used - With Some Problems" className='bg-primary'>Used - With Some Problems</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone Purchased Price</span>
                        </label>
                        <input type="number" placeholder="purchased price" className="input input-bordered" required
                            {...register('purchasedPrice')}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone Selling Price</span>
                        </label>
                        <input type="number" placeholder="selling price" className="input input-bordered" required
                            {...register('sellingPrice')}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Using Time</span>
                        </label>
                        <input type="number" placeholder="months of used" className="input input-bordered" required
                            {...register('usingTime')}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Reasons for sale</span>
                        </label>
                        <input type="text" placeholder="selling reason" className="input input-bordered" required
                            {...register('sellingReason')}
                        />
                    </div>
                </div>
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text">Details</span>
                    </label>
                    <textarea type="text" placeholder="White the full detailes here..."
                        className="textarea textarea-bordered" required
                        {...register('sellingReason')} rows='4'
                    />
                </div>
                <div>
                    <h1 className='my-8 text-2xl text-center font-semibold'>Seller Info</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2  gap-x-4 gap-y-3 mt-5'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" className="input input-bordered" required defaultValue={sellerInfo?.name} disabled
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Number</span>
                            </label>
                            <input type="number" placeholder="number" className="input input-bordered" required
                                {...register('sellerNumber')}
                            />
                        </div>

                    </div>



                </div>

                <div className=' label-text-alt mt-4 '>
                    <p className='ml-1 text-red-600'>
                        {
                            error && <span className='absolute'>Error: {error}</span>
                        }
                    </p>
                </div>
                <div className='flex justify-center md:justify-start'>
                    <button type="submit" className='btn text-white btn-secondary mt-8 w-40 '>
                        Add Phone
                    </button>
                </div>


            </form>

        </div>
    );
};

export default AddProduct;
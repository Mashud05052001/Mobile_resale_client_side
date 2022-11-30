import React from 'react';
import toast from 'react-hot-toast';

const ModalForBuyProduct = ({ userName, userEmail, phone, price, setShowModal, phoneId, userId, sellerInfo }) => {
    // console.log(userName, userEmail, phone, price)
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const information = {
            userName, userEmail, userId, phone, phoneId, price, number: form.number.value, location: form.location.value, soldStatus: false,
            sellerId: sellerInfo?._id,
        }
        fetch(`${process.env.REACT_APP_server_url}/orders`, {
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
                    toast.success('You have successfully placed a order');
                    setShowModal(null);
                }
                else if (data.message === 'alreadyAdded') {
                    toast.error("You cann't order same item multiple time. Please check your order list to buy.");
                    setShowModal(null);
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="phoneBuyModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="phoneBuyModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-2 gap-x-5 gap-y-4'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Name</span>
                                </label>
                                <input type="text" defaultValue={phone} disabled className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input type="text" defaultValue={`${price} BDT`} disabled className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Buyer Name</span>
                                </label>
                                <input type="text" defaultValue={userName} disabled className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" defaultValue={userEmail} disabled className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <input type="number" name='number' placeholder='phone number' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Provide Meeting Location</span>
                                </label>
                                <input type="text" name='location' placeholder='Please provide a real meetup location' className="input input-bordered" required />
                            </div>

                        </div>
                        <button type="submit" className='btn btn-sm  w-40 text-white btn-secondary mt-5 '>Pay Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalForBuyProduct;
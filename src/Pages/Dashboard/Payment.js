import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(`${process.env.REACT_APP_pk}`);
const Payment = ({ info, wiseList, refetch }) => {

    const { phone, phoneId, price, userId, _id, userName, userEmail } = info;
    return (
        <>
            <input type="checkbox" id="payment-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="payment-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-xl text-center font-bold">Payment Section</h3>
                    <div className='sm:grid grid-cols-3 mt-8 '>
                        <div className='col-span-2'>
                            <p className='text-sm ml-1 mb-1 '>Phone Name :
                                <span className='ml-2 font-medium'>
                                    {phone}
                                </span>
                            </p>
                        </div>
                        <div className='mt-3 sm:mt-0'>
                            <p className='text-sm ml-1 mb-1'>Price :
                                <span className='ml-2 font-medium'>
                                    {price} BDT
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className='md:mt-3 pt-5 pr-3 sm:pr-7 mb-5 '>
                        <Elements stripe={stripePromise} >
                            <CheckoutForm info={info} wiseList={wiseList} refetch={refetch} />
                        </Elements>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;
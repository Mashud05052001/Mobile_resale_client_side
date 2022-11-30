import React, { useEffect, useState } from 'react';
import { CardElement, Elements, ElementsConsumer, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CheckoutForm = ({ info, wiseList, refetch }) => {
    const { price } = info;
    // console.log(info)
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${process.env.REACT_APP_server_url}/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ price })
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        if (!stripe || !elements) return;
        const card = elements.getElement((CardElement));
        if (card === null) return;
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card', card
        });
        if (error) { setError(error.message); console.log('[error] = ', error); }
        else { console.log('[PaymentMethod = ]', paymentMethod); }
        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: info?.userName,
                        email: info?.userEmail,
                    },
                },
            },
        );
        if (confirmError) {
            setError(confirmError.message);
            setProcessing(false); return;
        }
        if (paymentIntent.status === 'succeeded') {
            setSuccess('Congrats! Payment completed.')
            setTransactionId(paymentIntent.id);
            // setProcessing(false);
            const sendData = {
                transactionId: paymentIntent.id,
                amount: paymentIntent.amount / 100,
                buyerId: localStorage.getItem('secretCode'),
                buyerName: info?.userName,
                buyerEmail: info?.userEmail,
                phoneId: info?.phoneId,
                phoneName: info?.phone,
            }
            fetch(`${process.env.REACT_APP_server_url}/payments?wiseList=${wiseList}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(sendData)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        console.log(1);
                        if (wiseList) {
                            navigate('/dashboard/orders');
                            toast.success('You have successfully paif this item.')
                        }
                        else refetch();
                    }
                })
        }
        console.log('payment', paymentIntent)

    }

    return (
        <>
            <form onSubmit={handleSubmit} className='relative'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <>
                    {
                        error &&
                        <p className='absolute top-[28px] text-[14px] text-red-600'>{error}</p>
                    }
                </>
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                    className='mx-auto md:mx-0 mt-8 btn btn-sm border-none rounded-md float-right w-32 text-black  tracking-wide text-md font-semibold  bg-gradient-to-r from-secondary via-primary to-primary hover:from-primary hover:via-secondary hover:to-secondary'
                >
                    Pay Now
                </button>

            </form>
            {
                success &&
                <div className='mt-2'>
                    <p className='text-green-600'>{success}</p>
                    <p>Your TransactionId: &nbsp;
                        <span className='font-semibold'>
                            {transactionId}
                        </span>
                    </p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;
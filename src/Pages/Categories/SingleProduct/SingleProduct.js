import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
    const [phoneInfo, setPhoneInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const phoneId = useParams().id;
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_server_url}/singlePhone/${phoneId}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem("token")}`
            }
        })
            .then(result => {
                console.log(result.data)
                setPhoneInfo(result.data);
                setLoading(false);
            })
    }, [phoneId])
    const { condition, imageURL, model, name, purchasedPrice, sellingPrice, sellerName, sellerNumber, sellingReason, state, status, uploadDate, usingTime } = phoneInfo;
    return (
        <section className='border-2 border-primary/80'>
            {
                phoneInfo &&
                <div className='grid grid-cols-3'>
                    <div className='bg-red-200 w-80 h-80'>
                        <img src={imageURL} alt="" className='w-full' />
                    </div>
                </div>
            }
        </section>
    );
};

export default SingleProduct;
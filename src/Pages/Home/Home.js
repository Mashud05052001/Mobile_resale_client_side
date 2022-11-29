import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading2 from '../../Shared/Amination/Loading2';
import AdvertisedItems from './AdvertisedItem/AdvertisedItems';
import HomeBanner from './HomeBanner/HomeBanner';
import HomeCategories from './HomeCategories.js/HomeCategories';

const Home = () => {
    // const { data: categories = [], data: allPromotePhone = [], isLoading, refetch } = useQueries({
    //     queries: [
    //         {
    //             queryKey: ['categories'],
    //             queryFn: async () => {
    //                 // axios.get(`${process.env.REACT_APP_server_url}/categories?number=5`)
    //                 //     .then(res => res.data);
    //                 const res = await fetch(`${process.env.REACT_APP_server_url}/categories?number=5`);
    //                 const data = await res.json();
    //                 return data;
    //             },
    //         },
    //         {
    //             queryKey: ['allPhones'],
    //             queryFn: async () => {
    //                 // axios.get(``)
    //                 const res = await fetch(`${process.env.REACT_APP_server_url}/allPhones?need=promoteItems`, {
    //                     authorization: `bearer ${localStorage.getItem('token')}`,
    //                 });
    //                 const data = await res.json();
    //                 return data;
    //             },
    //         },
    //     ]
    // })
    const [categories = [], allPromotePhone = []] = useQueries({
        queries: [
            {
                queryKey: ['categories'],
                queryFn: () =>
                    axios
                        .get(`${process.env.REACT_APP_server_url}/categories?number=5`)
                        .then((res) => res.data),
            },

            {
                queryKey: ['allPhones'],
                queryFn: () =>
                    axios
                        .get(`${process.env.REACT_APP_server_url}/allPhones?need=promoteItems`, {
                            authorization: `bearer ${localStorage.getItem('token')}`,
                        })
                        .then((res) => res.data),
            }
        ],
    });


    return (
        <div>
            {
                (categories?.isLoading || allPromotePhone?.isLoading)
                    ?
                    <Loading2 />
                    :
                    <>
                        <HomeBanner />
                        <HomeCategories categories={categories.data} />
                        <AdvertisedItems allPromotePhone={allPromotePhone.data} />
                    </>
            }

        </div>
    );
};

export default Home;
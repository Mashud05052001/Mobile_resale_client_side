import React from 'react';
import AdvertisedItems from './AdvertisedItem/AdvertisedItems';
import HomeBanner from './HomeBanner/HomeBanner';
import HomeCategories from './HomeCategories.js/HomeCategories';

const Home = () => {
    return (
        <div>
            <HomeBanner />
            <HomeCategories />
            <AdvertisedItems />
        </div>
    );
};

export default Home;
import React from 'react';
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../media/Json Animation/waitingGoogleTypeAnimation.json";

const Loading = () => {
    return (
        <div>
            <Lottie animationData={groovyWalkAnimation} />
        </div>
    );
};

export default Loading;
import React, { useEffect, useState } from 'react';
import MobileLoading from '../../../Shared/Amination/MobileLoading';

const MyBuyers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [buyers, setBuyers] = useState(true);

    const url = `${process.env.REACT_APP_server_url}/getAllPhones?sellerId=${localStorage.getItem('secretCode')}`;
    useEffect(() => {
        fetch(url, {
            headers: { authorization: `bearer ${localStorage.getItem('token')}` }
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                setBuyers(data);
            })
    }, [url])
    console.log(buyers)

    return (

        <div>
            {
                (isLoading) &&
                <div >
                    <MobileLoading />
                </div>

            }
            <div className={`overflow-x-auto w-full ${isLoading ? '-mt-[250px] opacity-40' : 'mt-0'}`}>
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Buyer's Name</th>
                            <th>Buyer's Email</th>
                            <th>Purchased Product</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            (buyers.length > 0) &&
                            buyers.map((buyer, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>


                                    <td>
                                        {buyer?.buyerName}
                                    </td>
                                    <td>
                                        {buyer?.buyerEmail}
                                    </td>
                                    <td>
                                        {buyer?.name}
                                    </td>


                                </tr>
                            )
                        }



                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyBuyers;
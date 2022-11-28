import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/UserContext";

export const useJwtToken = email => {
    const [jwtToken, setJwtToken] = useState('');
    const { user } = useContext(AuthContext);
    const url = `${process.env.REACT_APP_server_url}/jwt?email=${email}`;
    useEffect(() => {
        if (email) {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        localStorage.setItem('token', data.token);
                        setJwtToken(data.token);
                        fetch(`${process.env.REACT_APP_server_url}/users?email=${user?.email}&joinfrom=${user?.providerData[0]?.providerId}`, {
                            headers: {
                                authorization: `bearer ${localStorage.getItem('token')}`
                            }
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data._id);
                                localStorage.setItem('secretCode', data?._id);
                            })
                    }
                })
        }
    }, [email, url])
    return jwtToken;
}
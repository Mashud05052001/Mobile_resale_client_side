import { useEffect, useState } from "react";

export const useJwtToken = email => {
    const [jwtToken, setJwtToken] = useState('');
    const url = `${process.env.REACT_APP_server_url}/jwt?email=${email}`;
    useEffect(() => {
        if (email) {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        localStorage.setItem('token', data.token);
                        setJwtToken(data.token);
                    }
                })
        }
    }, [email, url])
    return jwtToken;
}